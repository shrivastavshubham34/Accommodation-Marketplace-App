const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = graphql;
var { User } = require("../models/user");
var { Property } = require("../models/property");

var { mongoose } = require("../db/mongoose");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    usertype: { type: GraphQLString },
    gender: { type: GraphQLString },
    myProperties: {
      type: new GraphQLList(PropertyType),
      resolve(parent, args) {
        return Property.find({ ownerID: parent.id });
      }
    }
  })
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    city: { type: GraphQLString },
    zip: { type: GraphQLInt },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    bookedBy: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.bookedByID);
      }
    },
    owner: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.ownerID);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        usertype: { type: GraphQLString }
      },
      resolve(parent, args) {
        // getting data from mLab db

        return User.findById(args.id);
      }
    },
    profile: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // getting data from mLab db

        return User.findById(args.id);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        usertype: { type: GraphQLString }
      },
      resolve(parent, args) {
        // getting data from mLab db

        console.log(check);
        return User.findById(args.id);
      }
    },
    property: {
      type: PropertyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // getting data from mLab db
        return Property.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // getting data from mLab db
        return User.find({});
      }
    },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve(parent, args) {
        // getting data from mLab db
        return Property.find({});
      }
    },
    searchproperties: {
      type: new GraphQLList(PropertyType),
      args: {
        city: { type: GraphQLString }
      },
      resolve(parent, args) {
        // getting data from mLab db
        console.log("property search");
        return Property.find({ city: args.city });
      }
    },
    myproperties: {
      type: new GraphQLList(PropertyType),
      args: { ownerid: { type: GraphQLID } },
      resolve(parent, args) {
        // getting data from mLab db

        Property.find({ ownerID: args.ownerid }, (err, results) => {
          console.log(results);
        });
        return Property.find({ ownerID: args.ownerid });
      }
    },
    mybookings: {
      type: new GraphQLList(PropertyType),
      args: { bookedByID: { type: GraphQLID } },
      resolve(parent, args) {
        // getting data from mLab db

        Property.find({ bookedByID: args.bookedByID }, (err, results) => {
          console.log(results);
        });
        return Property.find({ bookedByID: args.bookedByID });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        usertype: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        var user = User.findOne({ email: args.email });
        if (user) {
          return "value already exists";
        } else {
          let user = new User({
            email: args.email,
            usertype: args.usertype,
            firstName: args.firstName,
            lastName: args.lastName,
            gender: args.gender
          });
          user.password = user.generateHash(args.password);

          return user.save();
        }
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        User.findOneAndUpdate(
          { _id: args.id },
          {
            $set: {
              email: args.email,
              firstName: args.firstName,
              lastName: args.lastName,

              gender: args.gender
            }
          },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
              return err;
            }
            console.log("update doc in db: " + doc);
            return doc;
          }
        );
      }
    },
    addProperty: {
      type: PropertyType,
      args: {
        city: { type: GraphQLString },
        zip: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        ownerID: { type: GraphQLString }
      },
      resolve(parent, args) {
        let property = new Property({
          city: args.city,
          zip: args.zip,
          title: args.title,
          description: args.description,
          ownerID: args.ownerID
        });

        return property.save();
      }
    },
    bookProperty: {
      type: PropertyType,
      args: {
        id: { type: GraphQLID },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        bookerId: { type: GraphQLID }
      },
      resolve(parent, args) {
        console.log("property book");
        Property.findOneAndUpdate(
          {
            _id: args.id
          },
          {
            $set: {
              startDate: args.startDate,
              endDate: args.endDate,
              bookedByID: args.bookerId
            }
          },
          (err, doc) => {
            console.log(doc);
          }
        );

        // return property.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

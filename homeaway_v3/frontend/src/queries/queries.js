import { gql } from "apollo-boost";

const getPropertyQuery = gql`
  {
    properties {
      id
      title
      description
      zip
      city
      owner {
        firstName
      }
    }
  }
`;

const myPropertyQuery = gql`
  query($ownerid: ID) {
    myproperties(ownerid: $ownerid) {
      id
      title
      description
      zip
      city
      owner {
        firstName
      }
    }
  }
`;

const viewBookingsQuery = gql`
  query($bookedbyid: ID) {
    mybookings(bookedByID: $bookedbyid) {
      id
      title
      description
      zip
      city
      owner {
        firstName
      }
    }
  }
`;

const searchPropertyQuery = gql`
  query($city: String!) {
    searchproperties(city: $city) {
      id
      title
      description
      zip
      city
      bookedBy {
        firstName
      }
      owner {
        firstName
      }
    }
  }
`;

const viewProfileData = gql`
  query($id: ID) {
    profile(id: $id) {
      id
      firstName
      lastName
      email
      gender
    }
  }
`;

const addUserMutation = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $usertype: String!
    $gender: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      usertype: $usertype
      gender: $gender
    ) {
      id
      firstName
    }
  }
`;

const updateUserMutation = gql`
  mutation(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $gender: String!
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      gender: $gender
    ) {
      id
      firstName
    }
  }
`;

const bookPropertyMutation = gql`
  mutation($id: ID, $startDate: String!, $endDate: String!, $bookerId: ID) {
    bookProperty(
      id: $id
      startDate: $startDate
      endDate: $endDate
      bookerId: $bookerId
    ) {
      title
    }
  }
`;

const autheticateUser = gql`
  query($email: String!, $password: String!, $usertype: String!) {
    login(email: $email, password: $password, usertype: $usertype) {
      id
      firstName
    }
  }
`;

export {
  getPropertyQuery,
  addUserMutation,
  autheticateUser,
  myPropertyQuery,
  searchPropertyQuery,
  bookPropertyMutation,
  viewBookingsQuery,
  viewProfileData,
  updateUserMutation
};

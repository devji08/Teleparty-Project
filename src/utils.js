import axios from "axios";

export const fetchUserData = async (name, after) => {
  const initialQuery = `query Search($query: String!) {
    search(query: $query, type: USER, first: 10) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      userCount
      edges {
        node {
          ... on User {
            name
            login
            avatarUrl
            followers {
              totalCount
            }
            url
          }
        }
      }
    }
  }`,
    afterQuery = `query Search($query: String!, $after: String!) {
    search(query: $query, type: USER, first: 10, after: $after) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      userCount
      edges {
        node {
          ... on User {
            name
            login
            avatarUrl
            followers {
              totalCount
            }
            url
          }
        }
      }
    }
  }`;

  const token = atob(process.env.REACT_APP_GITHUB_TOKEN.split(":").join(""));
  let query,
    variables = { query: `${name} in:name sort:followers` };

  if (after) {
    query = afterQuery;
    variables.after = after;
  } else {
    query = initialQuery;
  }

  const options = {
    method: "POST",
    url: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      query,
      variables,
    },
  };

  const res = await axios.request(options);

  return res.data;
};

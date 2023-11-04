import axios from "axios";

export const fetchUserData = async (name) => {
  const query = `query Search($query: String!) {
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
  }`;

  const token = atob(process.env.REACT_APP_GITHUB_TOKEN.split(":").join(""));

  const options = {
    method: "POST",
    url: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      query: query,
      variables: { query: `${name} in:name sort:followers` },
    },
  };

  const res = await axios.request(options);

  return res.data;
};

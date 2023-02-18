
# react_native_graphql_config

  

In this repository was implemented an example of how to config graphql on expo react native

  
  

# Step 1: Instaling expo

In this tutorial, we will use the `expo` to create react native project because this is the easiest way to create a react native app. If you want know more about the expo, you can go to the expo documentation.


<h3 align="center">  
	<a href="https://docs.expo.dev/">Expo</a>&nbsp;&nbsp;&nbsp;
</h3>




### yarn or npm
To install the expo we need to use a mangage packege, nowadays we have two good packeges to work the **yarn** or **npm**, you can chose the best for you, we will have both commands in this document.

<h3 align="center">  
	<a href="https://yarnpkg.com/getting-started/install">yarn</a>&nbsp;&nbsp;&nbsp;
	<a href="https://nodejs.org/en/download/">npm</a>&nbsp;&nbsp;&nbsp;
</h3>


### Instaling expo
We need to install the expo-cli globally
```
npm install -g expo-cli

yarn global add expo-cli
```


# Step 2: Create React Native project

To create a new project we basicaly need only this comand

```
expo init <project_name>
```
> remember to run this command on the folder that you want create a project

after run this command, you will need select some option, for this example, we will use a black (typescript) project, because in this template thare is the basic things that we need.

![image](https://user-images.githubusercontent.com/26638073/219879458-900ea97b-ee3e-40ba-8f90-c3ce665ef93f.png)

when the command finish, we need to go to the project folder and open the editor

```
cd <project_name>

code .
```
> as I am using the **VSCode** as a code editor, I run the command `code .`




# Step 3: Installing dependencies

Now we install these 2 dependencies by running:

```
npm install @apollo/client graphql
```

-   `@apollo/client`: connects client to a GraphQL API
-   `graphql`: provides GraphQL capabilities


# Step 4: Creating project structure

In our project now, we have a strucure like this:
![image](https://user-images.githubusercontent.com/26638073/219879670-468ea0f2-c273-48b8-8206-4fdb6b91a03b.png)

but we will need to create more files to config the graphql and new screens, so we need to create folders to organize the files.

### src

We need to create a folder to create all files related to the project functionality inside. As default, the name for this folder is `src`

### graphql

Into the `src` we need to create a new folder to have a graphql files

### screens

Into the `src` we need to create a new folder to have our project screens


After create this folder, we will have this structure

![image](https://user-images.githubusercontent.com/26638073/219880074-ccee8955-66a7-4126-9b73-f0be7b8f558f.png)



# Step 5: Creating Apollo Client

To integrate Apollo Client in our React Native app, we need to first import and initialize a new  `ApolloClient`  and use it in our  `App`  component.


### Initializing ApolloClient

On `graphql` folder we need to create the file `apollo-client.ts` that in this file we will have a function that will initilize and return the apollo client.

```
import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = "https://countries.trevorblades.com/graphql";

export function createClient() {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return client;
}
```

The  `uri`  refers to the GraphQL API endpoint that we will fetch data from. In this tutorial, I will be fetching some country data from the url:  `https://countries.trevorblades.com/graphql`.


### Using ApolloClient

After create we need to import this function on your `app` context, to be used by `ApolloProvider`.

Is required that the wrapping  `ApolloProvider` around the App component and pass client as a prop.

```
export default function App() {
  // Initialize Apollo Client
  const client = createClient();

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>My Countries App</Text>
        <HomeScreen />
      </View>
    </ApolloProvider>
  );
}
```


# Step 4: HomeScreen.js
Now let's create a simple HomeScreen component to display a list of continent names that we will fetch from the API.

In the root directory, we can create a src/HomeScreen.js component as shown below:


```
import { Text, FlatList, Pressable } from 'react-native'

export default function HomeScreen() {
  return (
    <Text>This is my Home Screen.</Text>
  );
}
```

Don't forget to import our HomeScreen component in our `App.js` like so:

```
import HomeScreen from './src/HomeScreen';

export default function App() {
  return (
    <ApolloProvider client={client}>
    <View style={styles.container}>
      <Text style={styles.title}>My Countries App</Text>
      <HomeScreen/> {/*import here*/}
    </View>
    </ApolloProvider>
  );
}
```




# Step 5: Add Query

Now let's add our GraphQL query to fetch continent names. If you're unsure how to write a GraphQL query, this countries API has a playground to test and help you write the queries.

For example, if we want to fetch a list of continent names, we can simply select the field name on the left panel. The query will automatically be shown in the middle panel.


Finally, running the query by clicking the blue button in the middle panel will allow you to view the results of the query, as shown in the screenshot above.

So let's start with creating a folder in src called gql/Query.js, where we will write all our GraphQL queries in it. The first query we will write is the `CONTINENT_QUERY`:

```
import { gql } from "@apollo/client";

export const CONTINENT_QUERY = gql`
  query ContinentQuery {
    continents {
      code
      name
    }
  }
`;
```


This will fetch a list of continent names and code from the countries API.

Back in HomeScreen.js, we import the CONTINENT_QUERY and a hook called useQuery to execute this query via Apollo Client.


```
import { useQuery } from "@apollo/client";
import { CONTINENT_QUERY } from "./gql/Query";
```

And we add the logic to fetch the data in HomeScreen:

 1. Execute the query using useQuery
 2. While loading is true, return a Text that has 'Fetchind data...'
 3. Return a FlatList component that displays all the continent names

```
import { Text, FlatList, Pressable } from "react-native";
import { useQuery } from "@apollo/client";
import { CONTINENT_QUERY } from "../graphql/query";

export default function HomeScreen() {
  const { data, loading } = useQuery(CONTINENT_QUERY); //execute query

  const ContinentItem = ({ continent }) => {
    const { name, code } = continent; //get the name of continent

    return (
      <Pressable>
        <Text>{name}</Text>
      </Pressable>
    );
  };

  if (loading) {
    return <Text>Fetching data...</Text>;
  }

  return (
    <FlatList
      data={data.continents}
      renderItem={({ item }) => <ContinentItem continent={item} />}
      keyExtractor={(item, index) => index}
    />
  );
}

```

And now, we can test our app by running:



```
yarn start
or
npm run start
```
We should have a list of continents being fetched and displayed!




## Autor

Made for  <b>Yuri Duque</b> 👋🏽

[![Linkedin Badge](https://img.shields.io/badge/-Yuri_Duque-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/yuri-duque/)](https://www.linkedin.com/in/yuri-duque/)





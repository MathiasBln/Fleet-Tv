# Goal

The goal of this project is to create a simple movie browsing app in React.

# Step 1 : Create a simple interface

- This interface should allow you to browse the list of movies in the provided *movies.json* file (see useful links at the end of the page)
- This interface should include at least **3 components** :
    - The list of available movies
    - A search bar
    - Details concerning a movie

Style this interface using your knowledge of HTML and CSS. You may use native CSS or your CSS framework of choice.

# Step 2 : Add functionality

The user should be able to select movies listed in the list on the left and filter that list using the search bar.

# Step 3 : Integrate themovieDB API

1. Create an account on [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Generate an API key (as described here : [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction) . Use version 3 of the API as its authentication mechanism is simpler than v4)
3. Connect your app to that API, replacing the *movies.json* file as a source for data
4. The search bar should leverage the API's search function instead of filtering the initial list

# Useful links

[movies.json](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/29d6c084-0f1a-4093-b260-676d7b08baf0/movies.json)

*If you are confortable with it you can skip the JSON part and integrate the API directly*
import React from 'react';
import UserList from './components/UserList';
import UserAddForm from './components/UserAddForm';
import PostList from './components/PostList';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: 'white',
      color: 'black',
      users: [],
      posts: [],
      areUsers: true
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.filter(user => user.id < 4);
        data.forEach(user => {
          user.isGoldClient = false;
          user.image = 'https://i.imgur.com/P4FbHtM.jpg';
          user.salary= '2500';
        });
        this.setState({users: data});
      })

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        data = data.filter(post => post.id < 4);
        this.setState({posts: data});
      })
  }

  changeColor(event) {
    this.setState({background: event.target.value});
  }

  changeTextColor(event) {
    this.setState({color:event.target.value});
  }

  showUsers = () => {
    this.setState({areUsers: true});
  }

  showPosts = () => {
    this.setState({areUsers: false});
  }

  deleteUser = (index) => {
    const users = Object.assign([], this.state.users);
    users.splice(index, 1);
    this.setState({users:users});
  }

  getUsersMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  getPostsMaxId(posts) {
    let maxId = 0;

    posts.forEach(post => {
      if (post.id > maxId) {
        maxId = post.id;
      }
    });

    return maxId;
  }


  submitAddForm(event, name, email, salary, image,  isGoldClient) {
      this.setState(prevState => {
        return {
          users: [
            ...prevState.users,
            {
              id: this.getUsersMaxId(prevState.users) + 1,
              name,
              email,
              salary,
              image,
              isGoldClient
            }
          ]
        }
      });
  }



  render() {
    return(
      <div className="app" style={{background: this.state.background, color:this.state.color}}>
        <h1>Admin panel - Proiectul 1</h1>
        <UserAddForm submitAddForm={(event, name, email, salary, image, isGoldClient) => 
                                    this.submitAddForm(event, name, email, salary, image, isGoldClient)}/>

        <div className="show-buttons">
            <button className="show-users" onClick={this.showUsers}>Show Users</button>
            <button className="show-posts" onClick={this.showPosts}>Show Posts</button>
        </div>
       
        {
        this.state.areUsers ? <UserList users={this.state.users}
                                        deleteUser = {this.deleteUser}
                              /> 
                             : <PostList posts={this.state.posts}/>
        }
        <div className="bg-color">         
          <label htmlFor="background_color">Change Background Color: </label>
          <input type="color" name="background_color" onChange={(event) => this.changeColor(event)}/>
        </div>
        <div className="text-color">
          <label htmlFor="text_color">Change Text Color: </label>
          <input type="color" name="text_color" onChange={(event) => this.changeTextColor(event)}/>
        </div>
      </div>
    );
  }
}

export default App;

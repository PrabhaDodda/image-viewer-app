import React, { Component } from 'react';
import './Home.css';
import { withStyles, rgbToHex, StylesProvider } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import * as moment from 'moment';



const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
      card: {
        maxWidth: "100%",
      },
     avatar: {
        margin: 10,
        width: 60,
        height: 60,
     },
     hr: {
        maxWidth: "100%",
     },
     icon: {
        margin: theme.spacing(1),
        fontSize: 32,
     }
});

//svg icon path definations

function FavoriteBorderIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 
        2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 
        5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 
        5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
      </SvgIcon>
    );
  }

  function FavoriteIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09
         3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </SvgIcon>
    );
  }
  

class Home extends Component{

    constructor(){
        super();
        this.imgdata = [];
        this.data = 'No data received';
        this.state = {
            profilePic: [],
            access_token: sessionStorage.getItem("access_token"),
            loggedIn: sessionStorage.getItem("access_token") === "null" ? false : true,
            userImages: [],
            createdTime: [],
            username: "",
            captionText:[],
            captionTag:[],
            favClick: false,
            addComment: [],
            searchField: "",
            filteredRes:[],
            comments:[],
            commentText:[],
            count: 1,
            }
    }
        
        UNSAFE_componentWillMount() {

            //call to API Endpoint 1 to get profile-picture
            
            let xhrEndPt1 = new XMLHttpRequest();
            let that = this;
            xhrEndPt1.addEventListener("readystatechange", function(){
                if (this.readyState === 4){
                    console.log(this.responseText);
                    // that.setState({profilePic: JSON.parse(this.responseText).data.profile_picture});
                    that.setState({profilePic: ''});
                    // that.setState({data: JSON.parse(this.responseText).data});
                    that.data = JSON.parse(this.responseText).data;

                    that.data.forEach(element => {

                      let xhrEndPt2 = new XMLHttpRequest();
                      let that1 = that;
                      xhrEndPt2.addEventListener("readystatechange", function(){
                          if (this.readyState === 4) {

                            let responseData = JSON.parse(this.responseText);
                            responseData.likes = 10;
                            responseData.imgid = element.id;
                            responseData.comment = "comment for image id " + element.id;
                            that1.imgdata.push(responseData); 
                            that.setState({userImages: that1.imgdata});
                            console.log(JSON.parse(this.responseText));
                           }                
                      });
                      xhrEndPt2.open("GET", that1.props.baseUrl + element.id + "?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJWNUJBNko2d1pza1dubGdCdzA4QjhDeGVBNGtxNENacklaNDdpZAWlnNWJQQ0gyXzRGMkdRS082LTZAXdFdwV041MzVuNWl3aWs5Vl9SZAkxnb1laZAmxVbkluV3NZAODl5VXVpSS1BZAGYwcnpWSG1fQkFKM21najFkU2Jv", true);
                      xhrEndPt2.send(null);
        
                    });
                    
               }
               
            });
            xhrEndPt1.open("GET", this.props.baseUrl + "me/media?fields=id,caption&access_token=IGQVJWNUJBNko2d1pza1dubGdCdzA4QjhDeGVBNGtxNENacklaNDdpZAWlnNWJQQ0gyXzRGMkdRS082LTZAXdFdwV041MzVuNWl3aWs5Vl9SZAkxnb1laZAmxVbkluV3NZAODl5VXVpSS1BZAGYwcnpWSG1fQkFKM21najFkU2Jv", true);
            xhrEndPt1.send(null);

            }

            //implementation of serching images posted by users based on some keyword
         onSearchChange = e => {
           this.setState({userImages:this.state.filteredRes});
            const searchText = e.target.value.toLowerCase();
          let userDetails = JSON.parse(
            JSON.stringify(this.state.userImages)
            );
           let filterRes = [];
       if (userDetails !== null && userDetails.length > 0){
         filterRes = userDetails.filter( 
           post => 
           post.caption.text
            .split("\n")[0]
            .toLowerCase()
            .indexOf(searchText) > -1
           );
           this.setState({
             userImages:[...filterRes],
          });
        }
      };

       
                     
        myDateFun = (imgdate) => {
          return moment(new Date(parseInt(imgdate, 10))).format("DD/MM/YYYY HH:mm:ss");
        }
         
       //Click event for adding comments entered in the comment input area
    onClickAddBtn = (imageId) => {
      var count = this.state.count
      var comment = {
          id: count,
          imageId: imageId,
          username: this.state.username,
          text: this.state.commentText.text,
      }
      count++;
      var comments = [...this.state.comments, comment];
      this.setState({
          ...this.state,
          count: count,
          comments: comments,
          commentText: "",
      })
  };

  // comment handler definitions

  onCommentChangeHandler = (event, imageId) => {
      this.setState({
        ...this.state,
        comment: event.target.value,
      });
  }

                      
        render() {
            const { classes } = this.props;
            
             return(
            <div> 
                <Header 
                baseUrl={this.props.baseUrl}
                showSearchBox="true" 
                profilePic={this.state.profilePic} 
                loggedIn={this.state.loggedIn}
                showAccount="true"
                searchChangeHandler={this.onSearchChange}/> 
                {this.state.loggedIn === true ?
                <div>             
                    <GridList cols={2} cellHeight='auto'>
                        {
                          this.state.userImages.map((tile) => (
                            <Card className={classes.card} key={"card"+" " + tile.imgid}>
                            <CardHeader avatar={
                             <Avatar alt="profile-Pic" src={(this.state.profilePic).toString()} className={classes.avatar}/>
                            }    
                             title={tile.username}     
                            subheader={tile.timestamp}>
                            </CardHeader>
                            <CardContent>
                            <GridListTile key={"userImg"+ " " + tile.imgid} className="user-image-grid-item">
                                <img src={tile.media_url} className="userImage" alt="my image"/>
                            </GridListTile>
                            <div className="imgTiltleTag">
                            <hr className={classes.hr}/>
                            <h4 className="captionText">My image</h4>
                               <span className="captionTag" key={"tags"+ "-my tags"}>{("#"+"my photo"+"")}</span>
                             <br/></div>
                           <div className="comments-block">

                           <div className="comment-display" key=" 123456789">
                           {tile.username}: {tile.comment}
                               </div>
                              </div>
                             <span onClick={(event)=>this.setState({favClick: !this.state.favClick})}>
                             {this.state.favClick === true? <div>
                             <span className="favIcon"><FavoriteIcon className={classes.icon}/></span>
                              <span className="like">{" "+ (tile.likes)--} likes</span> </div>:
                           <div><span><FavoriteBorderIcon className={classes.icon}/></span>  <span className="like">{" "+ (tile.likes)++} likes</span></div> } 
                            </span>
                             <br/><br/>
                                                      
                            <div className="commentAddSection" >
                        <FormControl className="formControl"> 
                              <InputLabel htmlFor="addComment">Add a comment</InputLabel>
                              <Input 
                              id="addComment" 
                              type="text" 
                              comment={this.state.addComment} 
                              onChange={(event) => this.onCommentChangeHandler(event, tile.imgid)} value={this.state.comment}
                              />
                            </FormControl>
                            <Button variant="contained" color="primary" className="AddBtn"  onClick={() => this.onClickAddBtn(tile.imgid)}>
                                ADD
                            </Button>
                        </div>
                            </CardContent>
                         </Card>

                          ))}
                 </GridList>
                 </div> : <Redirect to="/" /> 
                }
                        
            </div>
               )}
}

export default withStyles(styles)(Home);
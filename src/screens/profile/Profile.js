import React, { Component } from 'react';
import Header from "../../common/header/Header";
import './Profile.css'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Redirect } from 'react-router-dom'
//import Divider from '@material-ui/core/Divider';


//Styles to define modal orientations
const customStyles = {
  content: {
    top: '60%',
    left: '32%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const CustomStyles = {
  content: {
  top: '45%',
  left: '55%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  width: '60%',
  height: '50%',
  transform: 'translate(-50%, -50%)'
  }
  };

const styles = theme => ({
  avatar: {
    margin: 10,
    width: 50,
    height: 50,
    marginLeft: 200,
  },
  fab: {
    margin: theme.spacing(1),
  },
  gridListMain: {
    transform: 'translateZ(0)',
    cursor: 'pointer'
},
   hr: {
        width: 460,
   },
   icon: {
    margin: theme.spacing(1),
    fontSize: 32,
 }
})

//setting path parameter values for defining SVG icons


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

const TabContainer = function (props) {
  return (
      <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
          {props.children}
      </Typography>
  )
}

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      dataAPIEndPt1: [],
      profilePic: [],
      loggedIn: sessionStorage.getItem("access_token") == null ? false : true,
      username: "",
      followedBy: 0,
      follows: 0,
      posts: 0,
      fullName: "",
      userImages: [],
      modalIsOpen: false,
      reqFullName:"dispNone",
      changedFullName: "",
      imgModalIsOpen: false,
      clickedImg:[],
      clickedImgId: [],
      clickedImgProfilePic:[],
      clickedImgUserName: "",
      clickedImgCaption: "",
      clickedImgTags: [],
      clickedImgLikes: 0,
      favClick: false,
      commentText:[],
      comments:[],
      userCommentsforImage:[],
      }
  }

    
  UNSAFE_componentWillMount() {

    //call to API Endpoint 1 to get profile-picture

    let xhrEndPt1 = new XMLHttpRequest();
    let that = this;
    xhrEndPt1.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(JSON.parse(this.responseText));
        that.setState({ dataAPIEndPt1: JSON.parse(this.responseText).data });
        that.setState({ profilePic: JSON.parse(this.responseText).data.profile_picture });
        that.setState({ username: JSON.parse(this.responseText).data.username });
        that.setState({ followedBy: JSON.parse(this.responseText).data.counts.followed_by });
        that.setState({ follows: JSON.parse(this.responseText).data.counts.follows });
        that.setState({ posts: JSON.parse(this.responseText).data.counts.media });
        that.setState({ fullName: JSON.parse(this.responseText).data.full_name });
      }
    });
    xhrEndPt1.open("GET", this.props.baseUrl + "?access_token=AQDZCX7mbZkd7cri3nfMbbMXQgfYFx2GK3V9DQkceZRyae_Pp2gOgSL6qD3K9X0bLjtr-rMXy6jcva_lhSOs52kALixnzR9czRb3glJSxA9-DO_BAOnAKRqOopqaqaTgNMxYFFr2wFE6aQmVHpX4IGAp1zgMxIrHoFwS-QN5KGOdd95-ay6f2udWypOCiCNtdOLi5KNyyPsbNouw0h_5uSmgnLfjm_dWNUdBTV8AMNcP4Q");
    xhrEndPt1.send(null);

    //call to API End point2

    let xhrEndPt2 = new XMLHttpRequest();
    let that1 = this;
    xhrEndPt2.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(JSON.parse(this.responseText).data);
        that1.setState({ userImages: JSON.parse(this.responseText).data });
        console.log(JSON.parse(this.responseText));
      }
    });
    xhrEndPt2.open("GET", this.props.baseUrl + "media/recent?access_token=AQDZCX7mbZkd7cri3nfMbbMXQgfYFx2GK3V9DQkceZRyae_Pp2gOgSL6qD3K9X0bLjtr-rMXy6jcva_lhSOs52kALixnzR9czRb3glJSxA9-DO_BAOnAKRqOopqaqaTgNMxYFFr2wFE6aQmVHpX4IGAp1zgMxIrHoFwS-QN5KGOdd95-ay6f2udWypOCiCNtdOLi5KNyyPsbNouw0h_5uSmgnLfjm_dWNUdBTV8AMNcP4Q");
    xhrEndPt2.send(null);

  }
 
//different action event definations

  openModalHandler = () => {
    this.setState({modalIsOpen: true});
  }

  openImgModalHandler = () => {
    this.setState({imgModalIsOpen: true});
  }

  closeModalHandler = () => {
    this.setState({modalIsOpen: false});
  }

  closeImgModalHandler=() =>{
    this.setState({imgModalIsOpen: false});
  }

  onfullNameChangeHandler = (event) => {
    this.setState({changedFullName: event.target.value});
  }

  updateFullNameHandler = () => {
    this.state.changedFullName === "" ? this.setState({reqFullName:"dispBlock"}): this.setState({reqFullName:"dispNone"});
    this.setState({fullName: this.state.changedFullName});
    this.closeModalHandler();
  }

  // Identifying which image was clicked and accordingly setting some params to access them to perform different actions

  onImageClickHandler = (image) => {
    console.log(image);
    this.setState({clickedImgId: image.id});
    this.setState({clickedImg:image.images.standard_resolution.url});
    this.setState({clickedImgProfilePic:image.user.profile_picture});
    this.setState({clickedImgUserName:image.user.username});
    this.setState({clickedImgCaption: image.caption.text});
    this.setState({clickedImgTags:image.tags});
    this.setState({clickedImgLikes:image.likes.count});
    this.openImgModalHandler();
           
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
          count: count,
          comments: comments,
          commentText: "",
      })
  };

  // comment handler definitions

  onCommentChangeHandler = (event, imageId) => {
      var comment = {
          id: imageId,
          text: event.target.value,
      }
      this.setState({
          commentText: comment,
      });
  }

  render() {
        const { classes } = this.props;
        return (
      <div>
        {/* Importing header with the required params set */}
        <Header
          baseUrl={this.props.baseUrl}
          showSearchBox="false"
          showAccount="false"
          profilePic={this.state.profilePic}

          //Profile page information section implementation
          loggedIn={this.state.loggedIn} />
          {this.state.loggedIn === true ?
        <div className="profilePage">
          <div className="profileInfoSection">
            <Avatar alt="Profile_pic" src={this.state.profilePic} className={classes.avatar} />
            <div className="right">
              <span className="username">{this.state.username}</span>
              <span className="userInfo"><span className="infoTabs">Posts: {this.state.posts}</span>
                <span className="infoTabs">Follows: {this.state.follows}</span>
                <span className="infoTabs">Followed By: {this.state.followedBy}</span></span>
              <p className="userFullName">{this.state.fullName}
                <span className="editIcon">
                  <Fab color="secondary" aria-label="edit" className={classes.fab}>
                    <EditIcon onClick={this.openModalHandler} />
                  </Fab>
                </span>
              </p>

              {/* Modal implementation for the edit button */}
              <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="EditIcon"
              onRequestClose={this.closeModalHandler} style={customStyles}>
                <h2>Edit</h2><br/>
                <TabContainer>
                  <FormControl required>
                    <InputLabel htmlFor="fullName">Full Name</InputLabel>
                    <Input id="fullName" type="text" fullName={this.state.fullName} onChange={this.onfullNameChangeHandler}/>
                    <FormHelperText className={this.state.reqFullName}><span className="red">required</span></FormHelperText>
                  </FormControl><br/><br/>
                </TabContainer><br/>
                <Button variant="contained" onClick={this.updateFullNameHandler} color="primary">UPDATE</Button>
              </Modal>
            </div>
            </div> {/* diplaying all the images posted by the logged */}
            <div  className="flex-container">
              <div className="imagePosts">
               <GridList cellHeight={350} cols={3} className={classes.gridListMain}>
                {this.state.userImages.map(images=>(
                  <GridListTile onClick={()=>this.onImageClickHandler(images)} className="postedImages-grid-item" key={images.id}>
                      <img src={images.images.standard_resolution.url} className="image-posts" alt={images.caption.text}/>
                  </GridListTile>
                ))}
                </GridList>
                <Modal ariaHideApp={false} isOpen={this.state.imgModalIsOpen} contentLabel="imgPost"
                onRequestClose={this.closeImgModalHandler} style={CustomStyles}>
                  <div className="flex-container">
                    <div className="leftModal">
                      <img src={this.state.clickedImg} className="clickedImg" alt={this.state.clickedImgCaption}/>
                    </div>
                    <div className="rightModal">
                      <div className="modalHeader">
                        <span><img src={this.state.clickedImgProfilePic} className="userProfilePic" alt={this.state.clickedImgUserName}/></span>
                        <span className="clickedImgUserName">{this.state.clickedImgUserName}</span>
                        </div>
                        <hr className={classes.hr}/>
                        <div className="modalBody">
                        <h4 className="captionText">{(this.state.clickedImgCaption).split("#")[0]}</h4>
                        {this.state.clickedImgTags.map(tags=>(
                          <span className="captionTag">{"#"+tags+""}</span>
                        ))}
                        <div className="comments-block">
                          {this.state.comments.map(comment => (
                           this.state.clickedImgId === comment.imageId ?
                           <div className="comment-display" key={comment.id}>
                           {comment.username}: {comment.text}
                               </div> : null
                          ))}
                              </div>
      
                        </div>
                        <div className="likeSection">
                        <span onClick={()=>this.setState({favClick: !this.state.favClick})}>
                             {this.state.favClick === true? <div>
                             <span className="favIcon"><FavoriteIcon className={classes.icon}/></span>
                              <span className="like">{" "+ (this.state.clickedImgLikes)-1} likes</span> </div>:
                           <div><span><FavoriteBorderIcon className={classes.icon}/></span>  
                           <span className="like">{" "+ (this.state.clickedImgLikes)+1} likes</span></div> } 
                            </span>
                        </div>
                        <div className="commentAddSection" >
                        <FormControl className="formControl"> 
                              <InputLabel htmlFor="addComment">Add a comment</InputLabel>
                              <Input 
                              id="addComment" 
                              type="text" 
                              comment={this.state.addComment} 
                              onChange={(event) => this.onCommentChangeHandler(event, this.state.clickedImgId)} value={this.state.addComment} 
                              />
                            </FormControl>
                            <Button variant="contained" color="primary" className="AddBtn"  onClick={() => this.onClickAddBtn(this.state.clickedImgId)}>
                                ADD
                            </Button>
                        </div>
                      </div>
                  </div>
                </Modal>
              </div>
            </div> 
         </div>: <Redirect to="/" />
          }
        </div>
      )
  }
}

export default withStyles(styles)(Profile);
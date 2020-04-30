import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import YupError from '../yupErrorHandler/yupErrorHelper';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import UploadModal from '../Popup/Modal/uploadModal/uploadModal';
import MessageModal from '../Popup/Modal/messageModal/messageModal';
import jsonServer from '../../api/jsonServer';

//form validation with Yup
const validationShema = Yup.object().shape({

 title: Yup
  .string()
  .min(5, "Text must be greater or equal to 5.")
  .max(20, "Text must be less than or equal to 20.")
  .required("Please fill out this field."),

 description: Yup
  .string()
  .min(40, "Text must be greater than 40 or equal to 40.")
  .max(200, "Text must be less than or equal to 200 or equal to 200.")
  .required("Please fill out this field.")
});

class Dashboard extends Component {
 constructor(props) {
  super(props);

  this.state = {
   uploadCompleted: false,
   modalClose: false,
   errorMessage: false,
   video: null,
   videoFormat: null,
   loader: false,
   formData: {}
  };
 }

 componentDidMount() {

  /* when not authenticate,
   redirect back to intructor page
   */
  if (!this.props.auth) {
   this.props.history.replace('/instructor');
  }
 }

 componentDidUpdate(prevProps, prevState) {
  //call uploadVideoToDb function if state(formData) changes
  if (this.state.formData !== prevState.formData) {
   this.uploadVideoToDb(this.state.video);
  }
 }

 //listen for onchange input[file][video] event
 videoChangeHandler = (e) => {

  this.setState({
   videoFormat: null
  })

  /*
    update state(video) if
    a file and mp4 format is 
    selected
    */
  if (e.target.files.length) {
   if (e.target.files &&
    e.target.files[0].type === "video/mp4") {
    this.setState({
     video: e.target.files[0]
    })
   }
  }

  /*
  update state(videoFormat) 
  if file not and mp4 format
  */
  if (e.target.files.length) {
   if (e.target.files[0].type !== "video/mp4") {
    this.setState({
     videoFormat: "Unsupported Format / Mp4 Only"
    })
   }
  }

  /* update state(videoFormat) when
  no file is selected
  */
  if (e.target.files.length === 0) {
   this.setState({
    videoFormat: "Select a Mp4 video file"
   })
  }

 }

 uploadVideoToDb = (file) => {

  const copyState = { ...this.state };
  const { name, email } = this.props.authData;

  // *********** Upload file to Cloudinary ******************** //
  var url = 'https://api.cloudinary.com/v1_1/elearn/upload';
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", (e) => {
   var progress = Math.round((e.loaded * 100.0) / e.total);
   document.querySelector('.progress').style.width = progress + "%";

   if (progress === 100) {
    this.setState({
     uploadCompleted: true
    })
   }

  });

  xhr.onreadystatechange = function (e) {
   if (xhr.readyState === 4 && xhr.status === 200) {
    // File uploaded successfully
    var response = JSON.parse(xhr.responseText);
    //get uploaded file link
    const url = response.url;

    const { formData } = copyState;
    formData.url = url;
    formData.author = name;

    jsonServer.get('/tutors?id=' + email)
     .then(function (response) {
      const course = response.data[0].courses;
      course.push(formData);
      //post uploaded files to json-server
      jsonServer.patch('/tutors/' + email, { courses: course });
     });
   }
  };

  xhr.onerror = (err) => {
   console.log('something went wrong', err)
   this.setState({
    loader: false,
    errorMessage: true
   })
  }

  fd.append('upload_preset', 'elearn');
  fd.append('file', file);
  xhr.send(fd);

 }

 closeModal = () => {

  //reset input(file) value
  const videoFile = document.getElementById('videoFile');
  videoFile.value = null;

  this.setState({
   loader: false,
   errorMessage: false,
   uploadCompleted: false
  });

 }

 render() {

  return (
   <Fragment>
    <MessageModal
     text="There was a problem with your request.
      Please try again later."
     closeModal={this.closeModal}
     errorMessage={this.state.errorMessage} />
    <UploadModal
     closeModal={this.closeModal}
     completed={this.state.uploadCompleted}
     loader={this.state.loader} />
    <div
     data-test="dashboard-component"
     className="dashboard">
     <h1>Upload Your Courses</h1>
     <nav className="dashboard-nav">
      <Link to="/instructor">
       <i className=" fa fa-arrow-left"></i>
       Home
       </Link>
     </nav>
     <div className="dashboard-body">
      <Formik initialValues={{
       title: "",
       description: ""
      }}
       validationSchema={validationShema}
       onSubmit={(values, { resetForm }) => {

        //populate formData only if a video file is selected
        if (this.state.video && this.state.videoFormat === null) {
         this.setState({
          loader: true,
          formData: {
           ...values
          }
         });

         resetForm();
        }

        //update state if this.state.video is null
        if (!this.state.video) {
         this.setState({
          videoFormat: "Select a Mp4 video file"
         });

        }

       }} >
       {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur
       }) => (
         <form className="uploadForm" onSubmit={handleSubmit}>
          <div className="form-group">
           <input
            type="text"
            className="videoTitle"
            name="title"
            placeholder="Video Title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur} />
           <YupError
            touched={touched.title}
            message={errors.title} />
          </div>
          <div className="form-group">
           <textarea
            name="description"
            className="description"
            placeholder="What is the video about?"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}></textarea>
           <YupError
            touched={touched.description}
            message={errors.description} />
          </div>
          <div className="form-group">
           <label
            htmlFor="videoFile"
            className="video-label">
            Select a video file
            </label>
           <input
            type="file"
            className="videoFile"
            id="videoFile"
            name="videoFile"
            onChange={this.videoChangeHandler}
            onClick={this.videoChangeHandler} />
           {this.state.videoFormat ?
            <p className="error-message">{this.state.videoFormat}</p>
            : null
           }
          </div>
          <div className="form-group">
           <button className="button-blue" type="submit"> UPLOAD COURSE </button>
          </div>
         </form>
        )}
      </Formik>
     </div>
    </div>
   </Fragment>
  );
 }
}

const mapStateToProps = (state) => {
 return {
  authData: state.authentication.authData,
  auth: state.authentication.auth
 }
};

Dashboard.propTypes = {
 authData: PropTypes.object,
 auth: PropTypes.bool
};

export default connect(mapStateToProps)(Dashboard);
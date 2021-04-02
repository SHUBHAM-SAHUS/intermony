import React, {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import * as actions from "redux/actions/HarmonyActions";
import * as ConfigAction from "redux/actions/ConfigActions";
import * as commonService from "utils/CommonService";
import {useDispatch, useSelector} from "react-redux";
import Select from 'react-select';

export default ({history, formType,...props}) => {
  let harmonyId = props.match.params.harmonyId;
  const audioDuration = useRef();
  const dispatch = useDispatch();
  const { harmonyDetails } = useSelector(store => store.harmonyReducer);
  const { configList } = useSelector(store => store.configReducer);
  const [selectedCategories, setCategories] = useState([]);

  const [overclass, changeOver] = useState(false);
  const [overclassAudio, changeOverAudio] = useState(false);
  const defaultForm = {
    title: "",
    duration: "",
    frequency: 0,
    description: "",
    thumbnail_url: "",
    audio_url: "",
    artist: "",
    artist_portfolio_url: "",
    category_ids: []
  };
  const defaultFile = {
    thumbnail: {},
    audio: {},
  }; 
  const [form, setState] = useState(defaultForm);
  const [errors, setError] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [files, setFile] = useState(defaultFile);

  const handleChange = ({target}) => {
    if (target.value.trim() || (!target.value || typeof target.value !== "string")) setState({...form, [target.name]: target.value})
    setError({...errors, [target.name]: ""})
  };
  const handleSelectChange = (target) => {
    let category_ids = target ?  target.map(e => e.value) : [];
    setCategories(target || []);
    setState({...form, category_ids});
  };

  const handleImageIpload = (name, file, url) => {
    let img = new Image();
    img.onload = function () {
       if (this.width > 300) setFile({...files, [name]: {src: url, file: file}});
       else commonService.forError("File size is too small", "Error");
    };
    img.src = url;
  }
  const handleFile = (e) => {
    let file = e.target.files[0];
    if (file) {
        let url = URL.createObjectURL(file);
      if ((e.target.name ==="thumbnail" && e.target.files[0].type.split("/")[0] === "image")) {
        handleImageIpload(e.target.name, file, url)
      }
      else if ((e.target.name ==="audio" && e.target.files[0].type.split("/")[0] === "audio"))  {    
        setFile({...files, [e.target.name]: {src: url, file: e.target.files[0]}})
        
        let audio_element = e.target.nextElementSibling.nextElementSibling;
        if(audio_element){
          audio_element.pause();
          audio_element.load();
        }
        
      }
      changeOver(false)
      changeOverAudio(false)
    }
  };
  
  const addHarmony = (body) => {
    if (body.id) {
      let post;
      const {frequency, title, duration,thumbnail_url, audio_url, category_ids, artist, artist_portfolio_url, description } = body;
      let duration_seconds = parseInt(audioDuration.current.duration);
      let remove_category_ids = [];
      harmonyDetails.categories.map(e => {
        if (!category_ids.includes(e.id)) remove_category_ids.push(e.id);
        return e
      });
      post = {frequency, title, duration,thumbnail_url, audio_url, category_ids, remove_category_ids, duration_seconds, artist, artist_portfolio_url, description};
      Object.keys(post).map(key => {
        if (post[key] === null) delete post[key];
        return key
      });
      if (!files.audio.src) delete post.audio_url;
      if (!files.thumbnail.src) delete post.thumbnail_url;  
      dispatch(actions.updateHarmony({post}, body.id)).then(res => {
        setState(defaultForm);
        setFile(defaultFile);
        commonService.forSuccess("Post updated successfully!", "Success")
        history.push("/post");
      })
    }
    else {
      let duration_seconds = parseInt(audioDuration.current.duration);
      const postBody = {...body, duration_seconds};
      Object.keys(postBody).map(key => {
        if (!postBody[key]) delete postBody[key];
        return key
      });
      dispatch(actions.createHarmony({post: postBody})).then(res => {
        setState(defaultForm)
        commonService.forSuccess("Post created successfully!", "Success")
        history.push("/post");
      })
    }
  };

  const checkValidation = () => {
    let isValid = true;
    return isValid;
  };

  const checkURLValidation = (e) => {
    let URLRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    if (!URLRegex.test(e.target.value)){
     setError({...errors, artist_portfolio_url: "Invalid URL entered"});
    }
  }

  const handleSubmit = (e) => {    
    e.preventDefault();
    if (checkValidation()) {
      let tempForm = {...form};
      let filesURL = {};
      if (files.audio.file || files.thumbnail.file) {
         Object.keys(files).map((file_type, index) => {
          return files[file_type].file ?          
             dispatch(actions.config({
              "ext": file_type === "audio" ? [".mp3"] : [".png"]
            })).then(res => {
              let contentType = file_type === "audio" ? "audio/mpeg" : "image/png";
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", contentType);
              let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: files[file_type].file
              };
              commonService.isLoading.onNext(true);
              filesURL[file_type] = res.value.urls[0].photo_path;
              fetch(res.value.urls[0].presigned_url, requestOptions).then(response=> {
                if (index || !files.audio.file) {
                  addHarmony({...tempForm, [`audio_url`]: filesURL["audio"], thumbnail_url: filesURL["thumbnail"]});
                }
              })
            })          
           : true
        })
      } else {
        addHarmony({...tempForm});
      }
    }
    return true;
  };

  // const handleConfigChange = (e, index) => {
  //   let tempForm = {...form};
  //   tempForm.config[index][e.target.name] = e.target.value;
  //   setState(tempForm)
  // };

  //const toggleConfigFields = (type, index) => {
  //  let tempConfig = [...form.config];
  //  if (type === "add") tempConfig.push({name: "", of_type: ""});
  //  else tempConfig.splice(index, 1);
  //  setState({...form, config: tempConfig});
  //};
  const onDragOver = () => {
    changeOver(true)
    console.log("onDragOver")
  }
  const onDragLeave = () => {
    changeOver(false)
    console.log("onDragLeave")
  }

  const onDragOverAudio = () => {
    changeOverAudio(true)

    console.log("onDragOverAudio")
  }
  const onDragLeaveAudio = () => {
    changeOverAudio(false)
    console.log("onDragLeaveAudio")
  }

  // overclassAudio
  useEffect(() => {
    if (harmonyDetails && harmonyDetails.id === parseInt(harmonyId) && !loaded && formType === "update") {
      setLoaded(true);
      dispatch(ConfigAction.getConfigList());
      let tempharmony = {...harmonyDetails};
      let tempCategories = harmonyDetails.categories.map(e => {
        return {value: e.id, label: e.name}
      });
      tempharmony.category_ids = harmonyDetails.categories.map(e => e.id);
      delete tempharmony.categories;
      setCategories(tempCategories);
      setState(tempharmony);
    } else if (!loaded && formType === "create") {
      setLoaded(true);
      dispatch(ConfigAction.getConfigList())
      setState({...defaultForm});
    }    
  }, [harmonyDetails, loaded, formType, defaultForm, harmonyId, dispatch]);

  useEffect(() => {
    document.getElementById('file_input').addEventListener('dragleave', onDragLeave);
    document.getElementById('file_input').addEventListener('dragenter', onDragOver);
    document.getElementById('audio_file_input').addEventListener('dragleave', onDragLeaveAudio);
    document.getElementById('audio_file_input').addEventListener('dragenter', onDragOverAudio);

    return () => {
      return [window.removeEventListener("dragleave", onDragLeaveAudio), window.removeEventListener("dragenter", onDragOverAudio), window.removeEventListener("dragenter", onDragOver), window.removeEventListener("dragleave", onDragLeave)] 
    }
    // audio_file_input
  },[])
  
  return (
      <div className="pr_dash_right_boxes_main float_left">
        <div className="row mb-2">
          {/* <div className="col-sm-12 mb-3 float-left text-left"><Link to="/post"> Back</Link></div> */}
          <button onClick={() => history.push({pathname: "/post" , state: history.location.state})}  variant="contained" color="secondary" className="st_btn btn-primary btn submit-btn mt-3">
           Back
          </button>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="st_dash_n_harmony_form_box">
              <form onSubmit={(e) => handleSubmit(e)} >
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group  vs_cat_upload_input_box float_left">
                      <label>Title
                        <span
                            aria-hidden="true"
                            className="MuiFormLabel-asterisk MuiInputLabel-asterisk"
                            >
                          &thinsp;*
                        </span></label>
                      <input autoComplete="none" className="form-control" type="text" placeholder="Type here" name="title" value={form.title} onChange={handleChange} required/>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group  vs_cat_upload_input_box float_left">
                      <label>Frequency</label>
                      <input autoComplete="none" className="form-control" type="number" placeholder="Type here" name="frequency" value={form.frequency} onChange={handleChange}/>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="form-group vs_cat_upload_input_box float_left">
                      <label>Duration
                      </label>
                      <select name="duration" className="form-control" id="45" value={form.duration} onChange={e => handleChange(e)}>
                        {configList.duration && Object.keys(configList.duration).map((key,index) => <option key={index} value={key}>{configList.duration[key]}</option>)}
                      </select>

                    </div>
                  </div>

                  <div className="col-md-3 zIndex">
                    <div className="form-group  vs_cat_upload_input_box float_left">
                      <label>Category</label>
                      <Select
                          name="category_ids"
                          placeholder="Select"
                          value={selectedCategories}
                          isMulti
                          onChange={(e) => handleSelectChange(e)}
                          options={configList.categories && configList.categories.map((day) => {
                        
                        return { value: day.id, label: day.name };
                      })}
                          />
                    </div>
                  </div>
                  <div className="col-md-12">
                  < div className="form-group  vs_cat_upload_input_box">
                      <label>Description</label>
                      <textarea value={form.description} name="description" placeholder="Description" className="form-control" rows="4" onChange={handleChange}></textarea>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group  vs_cat_upload_input_box float_left">
                      <label>Artist</label>
                      <input autoComplete="none" className="form-control" type="text" placeholder="Type here" name="artist" value={form.artist} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group  vs_cat_upload_input_box float_left">
                      <label>URL</label>
                      <input autoComplete="none" className="form-control" type="text" disabled={form.artist ? false : true} placeholder="Type here" name="artist_portfolio_url" value={form.artist_portfolio_url} onChange={e => [handleChange(e), checkURLValidation(e)]} />
                      <small className="text-danger">{errors.artist_portfolio_url}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group  vs_cat_upload_input_box float_left">
                      <label>Thumbnail
                        <span
                            aria-hidden="true"
                            className="MuiFormLabel-asterisk MuiInputLabel-asterisk"
                            >
                          &thinsp;*
                        </span>
                      </label>
                      <label htmlFor="file_input" className="p-2 st_upload_box cursor-pointer w-100 h-100">
                        <CameraAltIcon></CameraAltIcon>
                        <span>Add post thumbnail</span>
                        <input type="file"  id="file_input" accept=".png, .jpg, .jpeg" hidden placeholder="Type here"  name="thumbnail"  onChange={handleFile} required={formType === "create"} className="fileDrop" />
                        <span className={overclass ? 'spanBorder hoverBorder' : 'spanBorder'}></span>
                        {(files.thumbnail.src || form.photo_urls) && <img src={(files.thumbnail.src || form.photo_urls["medium"])} alt="thumb" height="100" width="100"/> }
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group  vs_cat_upload_input_box float_left">
                      <label>Audio
                        <span
                            aria-hidden="true"
                            className="MuiFormLabel-asterisk MuiInputLabel-asterisk"
                            >
                          &thinsp;*
                        </span></label>
                      <label htmlFor="audio_file_input" className="p-2 st_upload_box cursor-pointer w-100 h-100">

                        <AudiotrackIcon></AudiotrackIcon>
                        <span>Add Audio</span>

                        <input type="file" accept="audio/*" hidden id="audio_file_input" placeholder="Type here" className="mb-2 form-control fileDrop"  name="audio" onChange={handleFile} required={formType === "create"} />
                        <span className={overclassAudio ? 'spanBorder hoverBorder' : 'spanBorder'}></span>
                        {files.audio.src || form.audio_url ? <audio controls ref={audioDuration}>
                          <source src={files.audio.src || form.audio_url} type="audio/mp3"/>
                          Your browser does not support the audio tag.
                        </audio> :
                            ""}
                      </label>


                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="vs_cat_upload_btn_box float-right">
                      <Link to={{pathname: "/post" , state: history.location.state}} className="st_btn btn-default btn">CANCEL</Link>
                      <button type="submit" className="st_btn btn-primary btn submit-btn">{formType === "update" ? "Update post" : "Add post"} </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}
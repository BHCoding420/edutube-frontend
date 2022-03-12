import React,{useState,useEffect} from 'react'
import {Modal,Button,ProgressBar,Badge} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TutorialModel} from '../../models/Video.model';
import { getCurrentUser } from '../../services/getCurrentUser';
import axios from "axios";

interface Props {
    isOpen: boolean;
    closeModal:()=>void;
}

const AddTutorial = ({isOpen,closeModal}:Props) => {

    const User:any = getCurrentUser();
    const [fileAdded, setfileAdded] = useState("");
    const [uploadData, setuploadData] = useState<TutorialModel>({_id: "",
    title: "",
    creator: "",
    description: "",
    tags: [],
    file: "",
    file_type: "",
    thumbnail: "",
    LikedBy: [],
    DislikedBy:[],
    UploadedAt:new Date()});
    const [preview, setpreview] = useState("");
    const [tag, settag] = useState("");
    const [thumbnail, setthumbnail] = useState(null);


    const [progress, setprogress] = useState(0);
    const [total, settotal] = useState(0);
    const [percentage, setpercentage] = useState(0);

    function addtag() {
        const newtags = uploadData.tags.concat(tag);
        console.log(newtags);
        setuploadData({ ...uploadData, tags: newtags });
    };

    function handlePic (e:any) {
        console.log(e.target.files[0]);
        const pic = e.target.files[0];
        setthumbnail(pic);
      };

      function handlefile (e:any) {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        setfileAdded(file);
        setuploadData({ ...uploadData, file_type: file.type });
      };

    function handleChange(e:any) {
        setuploadData({ ...uploadData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e:any) {
        e.preventDefault();
        let newUploadData = uploadData;
        newUploadData.creator = User.id;
        console.log(thumbnail);
        console.log(fileAdded);

        if (fileAdded && thumbnail) {
            let formData = new FormData();
            formData.append("file", fileAdded);
            formData.append("upload_preset", "bucvnm5ghbjhbj");

            await axios
              .request({
                method: "post",
                url: "https://api.cloudinary.com/v1_1/dtgghkfz3/upload",
                data: formData,
                onUploadProgress: (p) => {
                  console.log(p);
                  setprogress(p.loaded);
                  let my_total = p.total;
                  settotal(my_total);
                  let my_per = (p.loaded / my_total) * 100;
                },
              })
              .then((data) => {
                console.log({ data });
                //setuploadData({ ...uploadData, file: data.secure_url });
                newUploadData.file = data.data.secure_url;
              });

            formData = new FormData();
            formData.append("file", thumbnail);
            formData.append("upload_preset", "bucvnm5ghbjhbj");

            await axios
              .request({
                method: "post",
                url: "https://api.cloudinary.com/v1_1/dtgghkfz3/upload",
                data: formData,
              })
              .then((data) => {
                console.log({ data });
                //setuploadData({ ...uploadData, thumbnail: data.secure_url });
                newUploadData.thumbnail = data.data.secure_url;
              });
        }

        await axios
      .post("https://edutube-server.herokuapp.com/tutorials", newUploadData)
      .then((response) => {
        console.log(response);
        newUploadData._id = response.data._id;
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(newUploadData);

    }

    useEffect(() => {
      console.log("progress : " + progress);
      console.log("total : " + total);
    }, [progress,total])



  return (
    <Modal show={isOpen} onHide={closeModal}>
  <Modal.Header closeButton>
    <Modal.Title>Add Tutorial</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      <div id="addTut">
        <h3 className="text-center text-white ">Add a Tutorial</h3>

            <div id="register-row" className="row justify-content-center align-items-center" >

                    <div id="register-box" className="col-md-10">
                        <form id="register-form" onSubmit={(e) =>handleSubmit(e)}>


                            <h4 className="text-center text-info">Add an instructional Video / PDF</h4>
                            <div className="form-group">
                                <label htmlFor="Title" className="text-info">Title</label><br/>
                                <input type="text" name="title" id="Title" className="form-control" onChange={(e) =>handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="text-info">Description</label><br/>
                                <input type="text" name="description" id="description" className="form-control" onChange={(e) =>handleChange(e)}/>
                            </div>
                            <div className="form-group" >
                                <label htmlFor="tags" className="text-info">tags:</label><br/>
                                <div className="d-flex" style={{width: '100%'}}>
                                    <input type="tags" name="tag" id="tags" className="form-control" onChange={(e) =>settag(e.target.value)}/>
                                    <Button onClick={addtag}>+</Button>
                                </div>

                            </div>
                            <div className="d-flex justify-content-start flex-wrap" key={tag}>

                                {
                                uploadData.tags !== [] && uploadData.tags.map(tag => {return  (
                                    <Badge bg="secondary m-2">{tag}</Badge>);})
                                }

                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1" className="text-info">Add Video/PDF</label><br/>

                                <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handlefile}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1" className="text-info">Profile pic</label><br/>

                                <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handlePic}/>
                            </div>
                            <div>
                                <br/>
                                {preview && <img src={typeof preview === "string" ? preview : ""} alt="..." className="img-thumbnail"/>}
                            </div>
                            <ProgressBar now={total === 0 ? 0 : (progress / total) * 100} label={`${total === 0 ? "0" :((progress / total) * 100).toFixed()}%`} />
                            <div className="form-group">
                                <br/>
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="submit"/>
                            </div>


                        </form>
                    </div>

            </div>

      </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
  )
}

export default AddTutorial
import { useContext, useState } from "react";
import { Dropzone } from '@mantine/dropzone'
import styles from './UpdateProfile.module.css'
import { MdOutlineImage as ImageIcon } from 'react-icons/md'
import axios from "axios";
import { PulseLoader as LoadingIcon } from 'react-spinners'
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";
import { profileContext } from "../contexts/contexts";

let coverImage, profileImage

const UpdateProfile = ({ account }) => {
    
  const [updating, setUpdating] = useState(false)
  const [uploadedCoverImageURL, setUploadedCoverImageURL] = useState(null)
  const [uploadedProfileImageURL, setUploadedProfileImageURL] = useState(null)

  const [profile, setProfile] = useContext(profileContext)


  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    websiteLink: "",
    profileImageUrl: "",
    coverImageUrl: "",
  });

  // const [profileImage, setProfileImage] = useState();
  // const [coverImage, setCoverImage] = useState();

  const setCoverImage = (files) => {
      coverImage = files[0]
      setUploadedCoverImageURL(URL.createObjectURL(coverImage))
    }
    
    const setProfileImage = (files) => {
      profileImage = files[0]
      setUploadedProfileImageURL(URL.createObjectURL(profileImage))
  }

  // category handler

  const imageUpload = async (image) => {
    if (!image) return null;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Mozaic");
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    let res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    res = await res.json();
    return res.url;
    };

    const navigate = useNavigate()

    const update = async () => {
        console.log(profileImage)
        console.log(coverImage)
        setUpdating(true)
        notifications.show({
          title: 'Updating Profile',
          message: 'Updating profile...',
          loading: true,
          color: 'lime'
        })
        try {
            const profileImageCloudinaryUrl = await imageUpload(profileImage);
            const coverImageCloudinaryUrl = await imageUpload(coverImage);

            let user = {
                walletAddress: account,
            };

            if (profileImageCloudinaryUrl)
                user = { ...user, profileImageUrl: profileImageCloudinaryUrl };
            if (coverImageCloudinaryUrl)
                user = { ...user, coverImageUrl: coverImageCloudinaryUrl };
            if (formParams.name)
                user = { ...user, name: formParams.name };
            if (formParams.description)
                user = { ...user, description: formParams.description };
            if (formParams.websiteLink)
                user = { ...user, websiteLink: formParams.websiteLink };
            // console.log(process.env.SERVER_URL);
            
            console.log('updating .......')

            const { data: updatedProfile } = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/update`,
              {
                user,
              }
            );
            setProfile(updatedProfile)
            setUpdating(false)
            setTimeout(() => {

                navigate(`/profile/${account}`)

            }, 1000)
            // console.log(result);
        } catch (e) {
            console.log(e);
        }
        
        
    }
  return (

    <div className="">
      {/* <h2>Update Profile</h2> */}
      {/* name */}
      {/* <Dropzone style={{ background: `url(${uploadedImageURL})` }} className={styles.dropzone} onDrop={OnChangeFile}> */}
      <Dropzone className={styles.dropzoneCover} onDrop={setCoverImage} style={{ background: uploadedCoverImageURL ? '#0B1F21 !important' : `url(${uploadedCoverImageURL})` }} >
        <div className={styles.dropzone__main}>
            <ImageIcon className={styles.dropzone__cover__icon} />
            <div className={styles.dropzone__text}>
                <p className={styles.dropzone__line1}>Drag images here or click to upload</p>
            </div>
        </div>
      </Dropzone>
      <Dropzone className={styles.dropzoneProfile} onDrop={setProfileImage} style={{ background: `url(${uploadedProfileImageURL})` }} >
        <div className={styles.dropzone__main}>
            <ImageIcon className={styles.dropzone__profile__icon} />
            <div className={styles.dropzone__text}>
                <p className={styles.dropzone__line2}>Drag images here or click to upload</p>
            </div>
        </div>
      </Dropzone>
      <div className={styles.container} >
      <div className={styles.row}>
      <div className={styles.name}>
        <p className={`${styles.name__label} ${styles.label}`}>Name:</p>
        <input
          className={styles.name__input}
          type="text"
          placeholder="name"
          value={formParams.name}
          onChange={(e) =>
            updateFormParams({ ...formParams, name: e.target.value })
          }
        />
      </div>
      {/* descr */}
      <div className={styles.descr}>
        <p className={`${styles.descr__label} ${styles.label}`}>Description</p>
        <textarea
          className={styles.descr__input}
          type="text"
          placeholder=""
          value={formParams.description}
          onChange={(e) =>
            updateFormParams({ ...formParams, description: e.target.value })
          }
        />
      </div>
      {/* websiteLink*/}
      <div className={styles.name}>
        <p className={`${styles.name__label} ${styles.label}`}>Website Link:</p>
        <input
          className={styles.name__input}
          type="text"
          placeholder=""
          value={formParams.websiteLink}
          onChange={(e) =>
            updateFormParams({ ...formParams, websiteLink: e.target.value })
          }
        />
      </div>
  {/*
      <div className="">
        <p className="">Upload profile image</p>
        <input
          className=""
          type="file"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </div>
      <div className="">
        <p className="">Upload cover image</p>
        <input
          className=""
          type="file"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />
      </div> */}
      {/* submit button */}
      {/* <div className="">
        <button className="" onClick={update}>
          <p>Update</p>
        </button>
      </div> */}
      {/* <div className={styles.center}>
        <button className={styles.updateButton} onClick={update}>Update</button>
      </div> */}
      <div className={styles.center}>
          <button className={styles.updateButton} onClick={update} disabled={updating}>
            <p>{ updating && <LoadingIcon size={10} className={styles.loadingIcon} /> }</p>
            <p>{ updating ? 'Updating Profile' : 'Update Profile'}</p>
          </button>
      </div>
    </div>
    </div>
  </div>

    // <div className="">
    //   <div className="">
    //     <h2>Update Profile</h2>
    //     {/* name */}
    //     <div className="">
    //       <p className="">Name:</p>
    //       <input
    //         className=""
    //         type="text"
    //         placeholder="name"
    //         value={formParams.name}
    //         onChange={(e) =>
    //           updateFormParams({ ...formParams, name: e.target.value })
    //         }
    //       />
    //     </div>
    //     {/* descr */}
    //     <div className="">
    //       <p className="">Description</p>
    //       <p className="">Description</p>
    //       <textarea
    //         className=""
    //         type="text"
    //         placeholder=""
    //         value={formParams.description}
    //         onChange={(e) =>
    //           updateFormParams({ ...formParams, description: e.target.value })
    //         }
    //       />
    //     </div>
    //     {/* websiteLink*/}
    //     <div className="">
    //       <p className="">Website Link:</p>
    //       <input
    //         className=""
    //         type="text"
    //         placeholder=""
    //         value={formParams.websiteLink}
    //         onChange={(e) =>
    //           updateFormParams({ ...formParams, websiteLink: e.target.value })
    //         }
    //       />
    //     </div>
    //     {/* profile image */}
    //     <div className="">
    //       <p className="">Upload profile image</p>
    //       <input
    //         className=""
    //         type="file"
    //         onChange={(e) => setProfileImage(e.target.files[0])}
    //       />
    //     </div>
    //     {/* cover image */}
    //     <div className="">
    //       <p className="">Upload cover image</p>
    //       <input
    //         className=""
    //         type="file"
    //         onChange={(e) => setCoverImage(e.target.files[0])}
    //       />
    //     </div>

    //     {/* submit button */}
    //     <div className="">
    //       <button className="" onClick={update}>
    //         <p>Update</p>
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UpdateProfile;

import { useState } from "react";
import axios from "axios";

const UpdateProfile = ({ account }) => {
    console.log(account);
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    websiteLink: "",
    profileImageUrl: "",
    coverImageUrl: "",
  });

  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();

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

    const update = async () => {
        console.log(profileImage)
        console.log(coverImage)
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
            
            const result = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/update`,
              {
                user,
              }
            );
            console.log(result);
        } catch (e) {
            console.log(e);
        }
        
        
    }
  return (
    <div className="">
      <div className="">
        <h2>Update Profile</h2>
        {/* name */}
        <div className="">
          <p className="">Name:</p>
          <input
            className=""
            type="text"
            placeholder="name"
            value={formParams.name}
            onChange={(e) =>
              updateFormParams({ ...formParams, name: e.target.value })
            }
          />
        </div>
        {/* descr */}
        <div className="">
          <p className="">Description</p>
          <p className="">Description</p>
          <textarea
            className=""
            type="text"
            placeholder=""
            value={formParams.description}
            onChange={(e) =>
              updateFormParams({ ...formParams, description: e.target.value })
            }
          />
        </div>
        {/* websiteLink*/}
        <div className="">
          <p className="">Website Link:</p>
          <input
            className=""
            type="text"
            placeholder=""
            value={formParams.websiteLink}
            onChange={(e) =>
              updateFormParams({ ...formParams, websiteLink: e.target.value })
            }
          />
        </div>
        {/* profile image */}
        <div className="">
          <p className="">Upload profile image</p>
          <input
            className=""
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>
        {/* cover image */}
        <div className="">
          <p className="">Upload cover image</p>
          <input
            className=""
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>

        {/* submit button */}
        <div className="">
          <button className="" onClick={update}>
            <p>Update</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

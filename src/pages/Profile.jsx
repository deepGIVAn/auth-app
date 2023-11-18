import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const [formData, setFormData] = useState({});

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // console.log(image);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  // console.log(formData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data?.success === false) {
        dispatch(updateUserFailure(data));
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
      // console.log(error);
    }
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        // console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
          // console.log(formData);
        });
      }
    );
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt={currentUser.username}
          className="rounded-full h-24 w-24 self-center cursor-pointer object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-center">
          {imageError ? (
            <span className="text-red-700">
              Error while uploading, (Note: Size must be less than 4 MB.)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading image.. ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          name="username"
          defaultValue={currentUser.username}
          id="username"
          placeholder="username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          defaultValue={currentUser.email}
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="new password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75"
        >
          {loading ? "Loading.." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something went wrong" : ""}
      </p>
      <p className="text-green-700">
        {updateSuccess && "User Updated Successfully!"}
      </p>
    </div>
  );
}

{
  /* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */
}

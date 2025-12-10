import { useState } from "react";
import userIcon from "../../assets/user.png";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [success, setSuccess] = useState(false);

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    // createUser(name, photo);
    // console.log(name, photo);
    setSuccess(false);
    const profile = {
      displayName: name,
      photoURL: photo,
    };
    updateUser(profile)
      .then(() => {
        // console.log(result.user);
        setSuccess(true);
      })
      .catch(() => {
        // console.log(error.errorMessage);
      });
  };

  return (
    <div className="w-10/12 mx-auto grid grid-cols-1 px-2 items-center justify-center text-white ">
      <div className="md:my-10">
        <h1 className="text-4xl font-bold text-center p-10">My Profile</h1>
        <div className="flex gap-2 md:gap-5 justify-center">
          <div className="pt-2 object-cover">
            {user.photoURL ? (
              <img
                src={user?.photoURL}
                alt="Profile"
                className="md:size-12 size-6 object-cover"
              />
            ) : (
              <img
                src={userIcon}
                alt="Profile"
                className=" md:size-12 size-6"
              />
            )}
          </div>
          <div>
            <p className="text-sm md:text-xl">
              Name : <span className="font-bold">{user.displayName}</span>
            </p>
            <p className="text-sm md:text-xl">
              Email: <span className="font-bold">{user.email}</span>
            </p>
          </div>
        </div>
        <div className="py-10 ">
          <hr className=" " />
          <h2 className="py-10 font-bold text-2xl justify-center  text-center">
            Update Profile Information
          </h2>

          <form
            onSubmit={handleUpdateProfile}
            className=" flex flex-col items-center "
          >
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Name"
                required
              />
              {/* Photo */}
              <label className="label">Photo URL</label>
              <input
                name="photo"
                type="text"
                className="input"
                placeholder="Photo"
                required
              />
            </fieldset>
            {success && (
              <p className="text-green-700 font-bold text-center">
                Account Updated Successfully.
              </p>
            )}
            <button
              type="submit"
              className="btn my-5 md:my-10 bg-[#035372] text-white"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

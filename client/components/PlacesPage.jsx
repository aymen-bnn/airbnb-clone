import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Accomodations from "./Accomodations";

function PlacesPage() {
  const { action } = useParams();
  console.log(action)
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [addPhoto , setAddPhoto] = useState("")
  const [addedPhotos , setAddedPhotos] = useState([])
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState({
    wifi: false,
    freeParking: false,
    pets: false,
    tv: false,
  });
  const [extraInfos, setExtraInfos] = useState({
    checkinTime: "",
    checkoutTime: "",
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhotosChange = (e) => {
    const files = e.target.files;
    const data = new FormData()
    for(let i=0 ; i<files.length ; i++){
      data.append('photos' , files[i])
    }
    console.log(data)
    axios.post('/places/upload' , data , {
      'Content-type' : 'multipart/form-data'
    })
    .then(response => {
      const {data : filenames} = response
      setAddedPhotos(prev => {
        return [...prev , ...filenames]
      })
    })
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePerkChange = (e) => {
    const { name, checked } = e.target;
    setPerks((prevPerks) => ({
      ...prevPerks,
      [name]: checked,
    }));
    console.log(perks)
  };
  const addPhotoChange = async (e) => {
    e.preventDefault()
    const {data} = await axios.post('/places/upload-by-link', {link : addPhoto})
    setAddedPhotos([...addedPhotos , data])
    setAddPhoto("")


  }
  const handleExtraInfoChange = (e) => {
    const { name, value } = e.target;
    setExtraInfos((prevInfos) => ({
      ...prevInfos,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted:", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfos,
    });
    const {data} = await axios.post('/places' ,  {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfos,
    })
    console.log(data)
    // Reset form state

  };
  return (
    <div className="w-full h-screen">
      {action === "new" && (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={address}
              onChange={handleAddressChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="photos"
              className="block text-gray-700 font-bold mb-2"
            >
              Add Photos:
            </label>
            <div className="flex gap-3">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                type="text"
                onChange={(e)=> setAddPhoto(e.target.value)}
                placeholder="image link"
              />
              <button onClick={addPhotoChange} className="p-5 rounded-2xl font-semibold bg-slate-300">
                add
              </button>
            </div>
            <input
              type="file"
              id="photos"
              className="w-full"
              multiple
              onChange={handlePhotosChange}
            />
            <div className="w-full h-32 flex gap-5">
              {
                addedPhotos.length > 0 && (
                  addedPhotos.map((photo)=>{
                    return(
                      <img className="w-full object-cover rounded-xl" src={"http://localhost:4000/uploads/"+photo} alt="" />
                    )
                  })
                )
              }
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <p className="block text-gray-700 font-bold mb-2">Perks:</p>
            <label htmlFor="wifi" className="flex items-center mb-2">
              <input
                type="checkbox"
                id="wifi"
                name="wifi"
                checked={perks.wifi}
                onChange={handlePerkChange}
                className="mr-2"
              />
              WiFi
            </label>
            <label htmlFor="freeParking" className="flex items-center mb-2">
              <input
                type="checkbox"
                id="freeParking"
                name="freeParking"
                checked={perks.freeParking}
                onChange={handlePerkChange}
                className="mr-2"
              />
              Free Parking
            </label>
            <label htmlFor="pets" className="flex items-center mb-2">
              <input
                type="checkbox"
                id="pets"
                name="pets"
                checked={perks.pets}
                onChange={handlePerkChange}
                className="mr-2"
              />
              Pets Allowed
            </label>
            <label htmlFor="tv" className="flex items-center mb-2">
              <input
                type="checkbox"
                id="tv"
                name="tv"
                checked={perks.tv}
                onChange={handlePerkChange}
                className="mr-2"
              />
              TV
            </label>
          </div>
          <div className="mb-4">
            <p className="block text-gray-700 font-bold mb-2">Extra Infos:</p>
            <div>
              <label htmlFor="checkinTime" className="block text-gray-700 mb-2">
                Check-in Time:
              </label>
              <input
                type="text"
                id="checkinTime"
                name="checkinTime"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={extraInfos.checkinTime}
                onChange={handleExtraInfoChange}
              />
            </div>
            <div>
              <label
                htmlFor="checkoutTime"
                className="block text-gray-700 mb-2"
              >
                Check-out Time:
              </label>
              <input
                type="text"
                id="checkoutTime"
                name="checkoutTime"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={extraInfos.checkoutTime}
                onChange={handleExtraInfoChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Listing
          </button>
        </form>
      )}
      {
        action === undefined && (
          <Accomodations/>
        )
      }
    </div>
  );
}

export default PlacesPage;

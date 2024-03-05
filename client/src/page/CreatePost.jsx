import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import  Macos  from '../assets/macos.png';
import { PiPaintBrushHouseholdFill } from "react-icons/pi";
import Footer from '@/components/Footer';

const CreatePost = () => {
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const saveImage = () => {
    if (!form.photo) {
      alert('No image to save');
      return;
    }
  
    // Convert base64 to blob
    const byteString = atob(form.photo.split(',')[1]);
    const mimeString = form.photo.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
  
    // Create a link element, trigger download, and remove the link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'generated-image.jpeg'; // Give the file name you want to download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://dalle-arbb.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
    

  };

  

  return (
    <section className="max-w-7xl mx-auto flex flex-col justify-center items-center align-middle text-center">
      <div className="partsec bg-gray-100 p-3 rounded-lg shadow-lg border">
      <img src = {Macos} className='h-2 mb-5'></img>
      <div className="partsec bg-gray-100 p-10">
      <div className='flex flex-col justify-center items-center'>
        <h1 className="font-extrabold text-[#222328] text-6xl flex items-center align-middle mr-2"><PiPaintBrushHouseholdFill className='text-4xl'/>Create</h1>
        <p className="mt-2 ml-2 text-[#666e75] text-[14px] max-w-[350px]">Use your creativity to generate visuals and create art with simple prompts.</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="left flex gap-[50px]">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="@velpcode"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-gray-900 text-white border-[1px] shadow-lg font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
          <button
            type="button"
            onClick={saveImage}
            className="text-white bg-white text-black border shadow-lg font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={!form.photo} // Disable the button if there is no photo
>
  Save
</button>
          </div>
          <div className="right">
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[450px] p-3 h-[450px] flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20 object-contain opacity-20"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Share your work with other people</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] shadow-xl font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </form>
      </div>
      </div>
      <Footer />
    </section>
  );
};

export default CreatePost;

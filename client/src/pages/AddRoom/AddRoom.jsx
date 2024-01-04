import React, { useContext, useState } from 'react';
import AddRoomForm from '../../components/Forms/AddRoomForm';
import { imageUpload } from '../../api/Utils';
import { AuthContext } from '../../providers/AuthProvider';

const AddRoom = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    );
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        const form = event.target
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const from = dates.startDate;
        const to = dates.endDate; 
        const image = form.image.files[0]
        const price = form.price.value;
        const totalGuest = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;

        imageUpload(image)
            .then(data => {
                const roomData = {
                    location,
                    title,
                    from,
                    to,
                    price: parseFloat(price),
                    totalGuest,
                    bedrooms,
                    bathrooms,
                    description,
                    image: data.data.display_url,
                    host: {
                        name: user?.displayName,
                        image: user?.photoURL,
                        email: user?.email
                    }
                }
                console.log(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
            })
        console.log(location);

    }
    const handleImageChange = image => {
        setUploadButtonText(image.name);
    }

    const handleDates = ({selection}) => {
        setDates(selection);
    }
    return (
        <div>
            <AddRoomForm
                handleSubmit={handleSubmit}
                handleImageChange={handleImageChange}
                uploadButtonText={uploadButtonText}
                dates={dates}
                handleDates={handleDates}
            />
        </div>
    );
};

export default AddRoom;
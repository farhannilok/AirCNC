import { useEffect, useState } from 'react'
import Container from '../shared/Container/Container'
import Card from './Card';
import Loader from '../shared/Loader';
import { useSearchParams } from 'react-router-dom';
import Heading from '../Heading/Heading';
import { getAllRooms } from '../../api/Rooms';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useSearchParams();
    const category = params.get('category');
    useEffect(() => {
        setLoading(true)
        getAllRooms()
            .then(data => {
                if (category) {
                    const filteredCategory = data.filter(room => room.category === category);
                    setRooms(filteredCategory)
                } else {
                    setRooms(data);
                }
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, [category])

    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            {
                rooms && rooms.length > 0 ? <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                    {
                        rooms.map((room, id) => <Card key={id} room={room} />)
                    }
                </div>
                : <div className='pt-12'>
                    <Heading 
                     title="No Rooms Available In This Category!"
                     subtitle="Please Select Other Categories"
                     center={true}
                    />
                </div>
            }
        </Container>
    )
}

export default Rooms
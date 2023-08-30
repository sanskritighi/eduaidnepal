
import { useState } from "react";
import blogs from '../data/blogs'
import BlogModal from "../components/BlogModal";
import { useInView } from 'react-intersection-observer'
import {motion,useAnimation} from 'framer-motion'


function Blogs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData,setModelData]=useState({
    title:'Sample Title',
    content:'Sample Content'
  })


  const toggleModal = ({card}) => {
    setModelData({title:card.title,content:card.text})
    setModalOpen(!modalOpen);
  };
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const controls = useAnimation();
  const {ref, inView } =useInView;

  // useEffect(()=>{
  //   if(inView){
  //     controls.start({opacity:1,y:0});
  //   }
  // },[controls,inView]);

  return (
    <>
      <div className='justify-center content-center px-4 pl-8'>
        <div className='mt-4 pr-66 font-boldtext-center text-2xl  p-2 px-4 mb-4  text-slate-700'>
          Blogs
        </div>
        {/* our cards */}
        <div className='pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6'>
           
          { blogs.map((card, index) => (
              <>
              <div key={index} class="bg-white rounded-lg shadow-lg overflow-hidden ">
                <img class="h-48 w-full object-cover object-center hover:scale-110 "
                
                 src={card.img} alt="Blog post image"/>
                  <div class="p-4">
                    <h3 class="text-lg font-medium text-gray-900">{card.title}</h3>
                    <p class="text-gray-600 mt-2 line-clamp-3">{card.text}</p>
                    <div class="mt-4">
                      <span onClick={()=>toggleModal({card})} class="text-indigo-500 cursor-pointer hover:text-indigo-600 font-medium">Read more</span>
                    </div>
                  </div>
              </div>
              </>
            ))
          }
          
         
        </div>
      </div>
        <BlogModal title={modalData.title} content={modalData.content} isOpen={modalOpen} setIsOpen={setModalOpen} />
    </>
  )
}

export default Blogs
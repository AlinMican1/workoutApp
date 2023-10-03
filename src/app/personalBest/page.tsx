import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PbCard from "@/components/atom/pbCard"

export default async function PersonalBestPage() {
    return(
        <>
        <div className=' border m-2 rounded-xl border-darkgray'>
        <h1 className='p-3 text-lg font-semibold ' >
           PERSONAL BEST <FontAwesomeIcon icon={faStar} className='text-white'/>
            
        </h1>
        </div>
        <div className={`border m-2 rounded-xl border-darkgray grid grid-cols-2 gap-0`}>
            <PbCard />
            <PbCard />
            <PbCard />
        </div>
        </>
    )
}
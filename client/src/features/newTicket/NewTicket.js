import IssueHeader from "./IssueHeader";
import IssueTitle from "./IssueTitle";
import SeverityDropDown from "./SeverityDropDown";
import TypeDropDown from "./TypeDropDown";
import IssueSummary from "./IssueSummary";
import SubmitButton from "./SubmitButton";
import UploadScreenshot from "./UploadScreenshot";

const NewTicket = () => {
    document.title = "New Memory";


    let content =
    <div className=" flex justify-center">
    <div className="space-y-4 divide-y divide-gray-200 min-w-[50%] max-w-screen-2xl">
        <IssueHeader/>
         <div className="pt-6"> 
             <IssueTitle/>

            <div className="flex flex-wrap  pt-4">
                <SeverityDropDown/>
                <TypeDropDown/>

            </div>

           <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
           <UploadScreenshot/>
           <IssueSummary/>  
           </div>  
            <span className="pt-6 float-right ">
                {/* <ResetButton/> */}
                <SubmitButton/>
            </span>
        </div> 
    </div>
</div>
    return (
        <section>
            {content}
        </section>
    )
}
export default NewTicket
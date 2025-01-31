import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SVGIcons from '../../SVGIcons'

const AdminApplicantInfo = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [applicantInfo, setApplicantInfo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchApplicantInfo = async () => {
        try {
            console.log(id);
            const response = await axios.get(`https://cleanez-api.vercel.app/api/admin/getApplicant/${id}`)

            console.log(response.data.applicant);
            setApplicantInfo(response.data.applicant);
        } catch (e) {
            console.log(e)
            navigate('/admin/applicants');
        }
    }
    
    useEffect(() => {
        fetchApplicantInfo();
    }, [])
    
    const handleDownload = (file, type) => {
        const binaryData = file;
        const blobType = (type === 'Resume' ? 'application/pdf' : 'image/jpeg');
        const extension = (type === 'Resume' ? 'pdf' : 'jpg');

        const blob = new Blob([new Uint8Array(binaryData)], {type: blobType});

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${applicantInfo.firstName}${applicantInfo.lastName}_${type}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }

    const setFileSize = (file) => {
        const binaryData = file;
        
        const blob = new Blob ([new Uint8Array(binaryData)]);

        return (blob.size / (1024 * 1024)).toFixed(2);
    }

    const handleReject = async (id) => {
        console.log(id);
        try {
            setIsSubmitting(true);

            await axios.put(`https://cleanez-api.vercel.app/api/admin/rejectApplicant/${id}`);
            
            console.log("Rejection Succesful");

            navigate('/admin/applicants');
        } catch (e) {
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleAccept = async (id) => {
        console.log(id);
        try {
            setIsSubmitting(true);

            await axios.put(`https://cleanez-api.vercel.app/api/admin/acceptApplicant/${id}`);

            console.log("Acceptance Succesful");

            navigate('/admin/applicants');
        } catch (e) {
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    const showActionButtons = (status) => {
        if (status === 'Pending') {
            return (
                <>
                    <button 
                    className="act-btn cancel"
                    onClick={(e) => handleReject(applicantInfo.userId)}>
                        Reject
                    </button>
                    <button 
                    className="act-btn complete"
                    onClick={(e) => handleAccept(applicantInfo.userId)}>
                        Accept
                    </button>
                </>
            );
        } else {
            return (
                <></>
            )
        }
    }

    return (  
        <div className="schedule-page">
        {applicantInfo ? 
            <div className="schedule-container">
                <h2>Applicant Data</h2>
                <div className="schedule-inputs" id="service-inputs">
                    {/* FIRST NAME */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            First Name
                        </label>
                        <input 
                        className="input" 
                        type="text"  
                        value={applicantInfo.firstName}
                        disabled/>
                    </div>

                    {/* LAST NAME */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Last Name
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.lastName}
                        disabled/>
                    </div>

                    {/* SERVICE CATEGORY */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Service Category
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.applicantDetails.serviceCategory}
                        disabled/>
                    </div>
                    
                    {/* AREA ASSIGNED */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Area Size Assigned
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.applicantDetails.areaAssigned}
                        disabled/>
                    </div>
                                        
                    {/* BIRTHDAY */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Birthdate
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.birthDate.replaceAll('/', ' / ')}
                        disabled/>
                    </div>
                                       
                    {/* GENDER */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Gender
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.gender}
                        disabled/>
                    </div>
                                       
                    {/* PHONE NUMBER */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Phone Number
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={`+63 ${applicantInfo.phoneNumber}`}
                        disabled/>
                    </div>
                                     
                    {/* EMAIL */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Email Address
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.email}
                        disabled/>
                    </div>
                                  
                    {/* BLOCK */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Block / No. / Street
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.address.block}
                        disabled/>
                    </div>
                    
                    {/* PROVINCE */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Province
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.address.province}
                        disabled/>
                    </div>

                    {/* MUNICIPALITY */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Municipality
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.address.municipal}
                        disabled/>
                    </div>

                    {/* BARANGAY */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Barangay
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={applicantInfo.address.barangay}
                        disabled/>
                    </div>

                    {/* FILES */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Resume and Valid IDs
                        </label>
                        <div 
                        className="selected-file"
                        onClick={(e) => handleDownload(
                            applicantInfo.applicantDetails.resume.data.data, 
                            'Resume'
                        )}>
                            <div className="file-icon">
                                <SVGIcons 
                                selected="filetypePDF"
                                size="24px"
                                color="#CC3363"/>
                            </div>
                            <div className="file-text">
                                <p>{`${applicantInfo.firstName}${applicantInfo.lastName}_Resume.pdf`}</p>
                                <p>{setFileSize(applicantInfo.applicantDetails.resume.data.data)} mb</p>
                            </div>
                        </div>
                        <div 
                        className="selected-file"
                        onClick={(e) => handleDownload(
                            applicantInfo.applicantDetails.validID.ID1.data.data, 
                            'ID1'
                        )}>
                            <div className="file-icon">
                                <SVGIcons 
                                selected="filetypeJPG"
                                size="24px"
                                color="#F9A024"/>
                            </div>
                            <div className="file-text">
                                <p>{`${applicantInfo.firstName}${applicantInfo.lastName}ID1.jpg`}</p>
                                <p>{setFileSize(applicantInfo.applicantDetails.validID.ID1.data.data)} mb</p>
                            </div>
                        </div>
                        <div 
                        className="selected-file"
                        onClick={(e) => handleDownload(
                            applicantInfo.applicantDetails.validID.ID2.data.data, 
                            'ID2'
                        )}>
                            <div className="file-icon">
                                <SVGIcons 
                                selected="filetypeJPG"
                                size="24px"
                                color="#F9A024"/>
                            </div>
                            <div className="file-text">
                                <p>{`${applicantInfo.firstName}${applicantInfo.lastName}ID2.jpg`}</p>
                                <p>{setFileSize(applicantInfo.applicantDetails.validID.ID2.data.data,)} mb</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="appointment-buttons">
                    <button 
                    type="button"
                    className="appointment-return"
                    onClick={(e) => {navigate('/admin/applicants');}}>
                        <SVGIcons
                        selected="previousArrow"
                        size="36px"
                        color="#222222"/>
                    </button>
                    {isSubmitting ?
                        <></> :
                        <div className="appointment-actions">
                            {showActionButtons(applicantInfo.applicantDetails.applicationStatus)}
                        </div>
                    }
                    
                </div>
            </div> :
            <></>
        }
                

        </div>
    );
}
 
export default AdminApplicantInfo;
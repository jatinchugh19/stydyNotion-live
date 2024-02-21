import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changePassword } from "../../../../services/operations/settingsAPI"
import IconBtn from "../../../common/IconBtn"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"


const UpdatePassword = () => {
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const SubmitPasswordForm = async (data) => {
        try{
            await changePassword(token, data)
        } catch (error) {
            console.log("ERROR MESSAGE : ", error.message)
        }
    }
    return (
        <form>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-10">
                <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="oldPassword" className="label-style">
                            Current Password
                        </label>
                        <input
                            type={showOldPassword ? "text" : "password"}
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter Current Password"
                            className="form-style"
                            {...register("oldPassword", {required:true})}
                        />
                        <span 
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    showOldPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )
                                }
                        </span>
                        {
                            errors.oldPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Current Password.
                                </span>
                            )
                        }
                    </div>

                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="newPassword" className="label-style">
                            New Password
                        </label>
                        <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter New Passwrd"
                        className="form-style"
                        {...register("newPassword", {required:true})}
                        />
                        <span
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {
                            showNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                            )
                        }
                        </span>
                        {
                            errors.newPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your New Password.
                                </span>
                            )
                        }
                    </div>
                </div>
            
            </div>

            <div className="flex justify-end gap-2">
                <button
                onClick={() => {
                    navigate("/dashboard/my-profile")
                }}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 "
                >
                    Cancel
                </button>
                <IconBtn type="submit" text="Update"/>
            </div>
        </form>
    )
}

export default UpdatePassword 
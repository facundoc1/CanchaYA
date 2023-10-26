/* eslint-disable no-unused-vars */
import React,{ useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from '../../../Redux/actions/admin_actions'
import UserCard from './UserCard';

const UsersAdmin=()=>{
    
    const getAllUsers= useSelector(state => state.getAllUsers);
    const notAllow= useSelector(state=> state.error)
    const dispatch=useDispatch();
    useEffect(()=>{
        if(getAllUsers?.length===0)
        dispatch(getUsers())
    },[dispatch])

    return(
    <div>
        {notAllow ? <p>{notAllow}</p>:getAllUsers?.map(user=>{
         return <UserCard user={user} key={user.id}/>
        })}
    </div>
    )
}
export default UsersAdmin
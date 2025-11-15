//Space 관리
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
import { supabase } from './supabaseClient'

//Space 생성
export async function Space(creatorId,group_name){
    let code_rad = Math.random().toString(36);
    code_rad = code_rad.substring(2,8);
    const code = code_rad.toUpperCase();

    const {data, error} = await supabase.from('groups').insert([{
        creatorId: creatorId,
        group_name: group_name,
        code: code,
        applicant_group: []
    }]).select().single()
    // .single()은 값이 반드시 1개일 때 true 0이거나 2개 이상이면 error

    if(error){
        return `Space 생성 실패: `,error;
    }else{
        return data;
    }
}
//참여 코드 생성
export async function getSpaceCode(code) {
    const {data, error} = await supabase.from('groups').select('*').eq('code',code.toUpperCase()).single()

    if(error){
        console.error('Space 조회 실패: ',error);
    }else
        return data
}
//Space 참여
export async function JoinSpace(userId, code) {
    const { data: group, error } = await supabase.from('groups').select('*').eq('code',code.toUpperCase()).single()
    if (error || !group){
        console.error('유효하지 않은 코드:',error);
    }
    //groups 테이블 쪽, applicant_group 쪽에다가 가입한 참여자들(userId)추가
    const updateGroups = [...(group.applicant_group || []),userId]

    const { error: updateError} = await supabase.from('groups').update({applicant_group: updateGroups}).eq('id',group.id)
    if(updateError){
        console.error('그룹 업데이트 실패: ',updateError)
        return { success: false, error: updateError.message }
    }

    //회원자의 join_group에다가 그룹을 추가
    const {data:User, error:userError} = await supabase.from('users').select('join_group').eq('id',userId).single()
    if(userError){
        console.error('사용자 조회 실패: ',userError)
        return { success: false, error: userError.message }
    }

    const updateUserGroup = [...(User.join_group || []),group.id]
    const { error: updateUser } = await supabase.from('users').update({join_group: updateUserGroup}).eq('id',userId)
    if(updateUser){
        console.error('사용자 업데이트 실패',updateUser);
        return { success: false, error: updateUser.message }
    }
    console.log('그룹 참여완료!');
    return{ group: group}
}
//그룹 관리
export async function MySpace(creatorId) {
    const { data,error} = await supabase.from('groups').select('*').eq('creatorId',creatorId)
    if(error){
        console.log('나의 그룹 목록 조회 실패: ',error)
        return []
    }else{
        return data;
    }
}
//그룹 구성원 관리
export async function MygetMember(groupId) {
    const {data: group, error:groupError} = await supabase.from('groups').select('applicant_group').eq('id',groupId).single()
    if(groupError || !group.applicant_group || group.applicant_group.length === 0){
        console.error('구성원 조회 실패: ',groupError);
        return { success: false, error: groupError.message }
        return []
    }
    const {data,error} = await supabase.from('users').select('id, nickname').in('id',group.applicant_group)
    if(error){
        console.log('구성원 조회 실패패',error)
        return []
    }else{
        return data
    }
}
//그룹 구성원 삭제
export async function MyremoveMember(groupId,memberId) {
    const {data: group, error:groupError} = await supabase.from('groups').select('applicant_group').eq('id',groupId).single()
    if(groupError){
        console.error('그룹 조회 실패 : ',groupError)
        return { success: false, error: groupError.message }
    }
    const updated = group.applicant_group.filter(id => id !== memberId)

    const {error: updateGroupError} = await supabase.from('groups').update({applicant_group: updated}).eq('id',groupId)
    if(updateGroupError){
        console.error('그룹 업데이트 실패: ',updateGroupError)
        return { success: false, error: updateGroupError.message }
    }
    //사용자를 join_group에서 삭제
    const {data: userData, error:userDataError} = await supabase.from('users').select('join_group').eq('id',memberId).single()
    if(userDataError){
        console.error('사용자 조회 실패',userDataError)
        return { success: false, error: userDataError.message }
    }
    //배열에서 해당 id만 제거
    const updatedJoinGroup = userData.join_group.filter(id => id !== groupId)
    const{error: updateUserError} = await supabase.from('users').update({join_group: updatedJoinGroup}).eq('id',memberId)
    if(updateUserError){
        console.error('사용자 업데이트 실패: ',updateUserError);
        return { success: false, error: updateUserError.message }
    }
    return{
        success: true
    }
}
//Space 삭제
export async function deleteSpace(groupId) {
    const {error} = await supabase.from('groups').delete().eq('id',groupId)
    if(error)
        console.error('그룹 삭제 실패~',error)
    else
        return true;
}
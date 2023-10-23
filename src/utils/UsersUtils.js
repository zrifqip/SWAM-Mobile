import { GetUsersDetail } from "@actions";
import { showToast } from "@constants";
import { usersDetail, usersUpdate, companyDetail, companyUpdate } from "@constants/apiUsers";
import store from "@stores/store";

class UsersUtils {

    async usersDetail() {
        return await usersDetail().then((response) => {
            const respon = response.data
            
            if(respon.status == "success"){
                return store.dispatch(GetUsersDetail(respon.data[0]))
            }
        }).catch((error) => {
            showToast(error)
        })
    }

    async usersUpdate(params) {
        return await usersUpdate(params).then((response) => {
            const respon = response.data
            if(respon.status == "success"){
                this.usersDetail()
                return 200 
            } 
            showToast(respon.message)
        }).catch((error) => {
            showToast(error)
        })
    }

    async companyDetail() {
        return await companyDetail().then((response) => {
            const respon = response.data
            if(respon.status == "success"){
                return store.dispatch(GetUsersDetail(respon.data[0]))
            }
        }).catch((error) => {
            showToast(error)
        })
    }

    async companyUpdate(params) {
        return await companyUpdate(params).then((response) => {
            const respon = response.data
            if(respon.status == "success"){
                this.companyDetail()
                return 200 
            } 
            showToast(respon.message)
        }).catch((error) => {
            showToast(error)
        })
    }
}

const usersUtils = new UsersUtils()

Object.freeze(usersUtils)

export default usersUtils
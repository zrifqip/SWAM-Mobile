import { GetTransactionsUsers, GetTransactionsUsersDetail, CurrentWaste } from "@actions";
import { showToast } from "@constants";
import { getTransactionsUsers, getTransactionsUsersDetail, getTransactionsWasteBanks, getTransactionsWasteBanksDetail, createTransactionsWasteBank } from "@constants/apiTransactions";
import { base_uri } from "@constants/BASE_URL";
import store from "@stores/store";
import MMKVStorage from 'react-native-mmkv-storage';
import Axios from "axios";
const AxiosForms = Axios.create();

class TransactionsUtils {

    async getTransactionsUsersDetail(id) {

        return await getTransactionsUsersDetail(id).then((response) => {
            const respon = response.data

            if(respon.message == "success"){
                store.dispatch(GetTransactionsUsersDetail(respon.data))
                return 200
            }
        }).catch((error) => {
            return 400
        })
    }

    async getTransactionsUsers() {
        
        return await getTransactionsUsers().then((response) => {
            const respon = response.data

            if(respon.message == "success"){
                if(respon.data.length != 0){
                    store.dispatch(CurrentWaste(true))
                }
                return store.dispatch(GetTransactionsUsers(respon.data))
            }
        }).catch((error) => {
            showToast(error)
        })
    }

    async uploadTransactionsUsersDetail(id, photo){
        const storage = new MMKVStorage.Loader().initialize();
        const session = await storage.getItem('token');
    
        const formData = new FormData();
        formData.append('images', photo);

        let api = `${base_uri}users/client/transaction?id=` + id

        AxiosForms({
            url    : api,
            method : 'PATCH',
            data   : formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization':`Gosnix ${session}`,
            }
        })
            .then(function (response) {
                
        })
        .catch(function (error) {
     
        })
    }

    // WASTE BANK
    async createTransactionsWasteBank(params, photo) {

        return await createTransactionsWasteBank(params).then((response) => {
                
            const respon = response.data

            if(respon.status == "success"){
                this.uploadTransactionsUsersDetail(respon.data.id, photo)
                this.getTransactionsWasteBanksDetail(respon.data.id)
                this.getTransactionsWasteBanks()

                return 200
            } else {
                showToast('Transaksi Gagal')
                return 400
            }
        }).catch((error) => {

            showToast('Transaksi Gagal')
            return 400
        })
    }

    async getTransactionsWasteBanksDetail(id) {

        return await getTransactionsWasteBanksDetail(id).then((response) => {
            const respon = response.data

            if(respon.message == "success"){
                store.dispatch(GetTransactionsUsersDetail(respon.data))
                return 200
            }
        }).catch((error) => {
            return 400
        })
    }

    async getTransactionsWasteBanks() {
        
        return await getTransactionsWasteBanks('page=1&limit=5000').then((response) => {
            const respon = response.data
            if(respon.message == "success"){
                return store.dispatch(GetTransactionsUsers(respon.data))
            }
        }).catch((error) => {
            showToast(error)
        })
    }
}

const transactionsUtils = new TransactionsUtils()

Object.freeze(transactionsUtils)

export default transactionsUtils
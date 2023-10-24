import {Chats, ChatsDetail} from '@actions';
import {showToast} from '@constants';
import {
  chatsCompany,
  chatsCompanyDetail,
  chatsCompanyStart,
} from '@constants/apiChats';
import store from '@stores/store';

class ChatsUtils {
  async chatsCompanyStart(id) {
    let temp = {
      userID: id,
    };

    return await chatsCompanyStart(temp)
      .then((response) => {
        const respon = response.data;

        if (respon.message == 'success') {
          this.chatsCompanyDetail(respon.data._id);
          return 200;
        }
      })
      .catch((error) => {
        showToast(error);
      });
  }

  async chatsCompany(params) {
    return await chatsCompany(params)
      .then((response) => {
        const respon = response.data;
        if (respon.message == 'success') {
          let sorted = [];
          if (respon.data.length != 0) {
            sorted = respon.data
              .filter((x) => x.lastMsg)
              .sort(function (a, b) {
                return (
                  parseFloat(a.lastMsg.datetime) >
                  parseFloat(b.lastMsg.datetime)
                );
              });
          }

          return store.dispatch(Chats(sorted));
        }
      })
      .catch((error) => {
        showToast(error);
      });
  }

  async chatsCompanyDetail(id) {
    return await chatsCompanyDetail(id)
      .then((response) => {
        const respon = response.data;

        if (respon.message == 'success') {
          return store.dispatch(ChatsDetail(respon.data));
        }
      })
      .catch((error) => {
        showToast(error);
      });
  }
}

const chatsUtils = new ChatsUtils();

Object.freeze(chatsUtils);

export default chatsUtils;

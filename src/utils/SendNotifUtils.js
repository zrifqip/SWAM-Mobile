import {sendNotifCompany, sendNotifUser} from '@constants/apiSendNotif';

class SendNotifUtils {
  async sendNotifCompany(params) {
    return await sendNotifCompany(params)
      .then((response) => {})
      .catch((error) => {
        return 400;
      });
  }

  async sendNotifUser(params) {
    return await sendNotifUser(params)
      .then((response) => {})
      .catch((error) => {
        return 400;
      });
  }
}

const sendNotifUtils = new SendNotifUtils();

Object.freeze(sendNotifUtils);

export default sendNotifUtils;

import * as actionTypes from '../constant/constant'

export function update(data) {
    return {
        type: actionTypes.USERINFO_UPDATE,
        data
    }
}

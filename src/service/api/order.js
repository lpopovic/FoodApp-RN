import axios from '../axios'
import { RestUrl } from './url'
import { Group } from 'react-native';

class OrderNetwork {


    static fetchOrder = (order) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.order
            // let formData = {
            //     orderedMenuItems: [
            //         {
            //             food: "5da9ba244157831bf8c61708",
            //             options: [ "5dcd3ca127f8b64b13725f82", "5dcd44c227f8b64b13725f84", "5dcd44c827f8b64b13725f85" ]
            //         },
            //         {
            //             food: "5da9b4904157831bf8c616fd",
            //             options: []
            //         }
            //     ],
            //     place: "5da86ac391408d5e60025780",
            //     specialInstructions:"",
            //     orderType: "delivery",
            //     isCatheringOrder: false
            // }
            console.log(order)
            let formData
            let orderedItems = []
            order.map(item => {
                let options = []
                item.selectedOptions.map(group => {
                    group.options.map(option => {
                        options.push(option._id)
                    })
                })
                orderedItems.push({
                    food: item.menuItem._id,
                    options: options
                }) 
                formData = {
                    orderedMenuItems: orderedItems,
                    place: item.menuItem.place._id,
                    specialInstructions: "",
                    orderType: "delivery",
                    isCatheringOrder: false
                }
            })
            console.log("FORM DATA:"+formData)
            console.log(orderedItems)
            try {
                const { data } = await axios.post(url, formData)
                // console.log(data)
                resolve(data)

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });
}

export { OrderNetwork }
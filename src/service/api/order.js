import axios from '../axios'
import { RestUrl } from './url'
import { Order } from '../../model'
import { Group } from 'react-native';

class OrderNetwork {


    static fetchOrder = (order, placeId, orderType, methodOfPayment, specialInstructions, customerAddress, customerPhoneNumber, scheduledTime) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.order

            let formData
            let orderedItems = []

            order.map(item => {

                for (let index = 0; index < item.quantity; index++) {
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
                }
            })
            formData = {
                orderedMenuItems: orderedItems,
                place: placeId,
                specialInstructions: specialInstructions,
                orderType: orderType,//"delivery",
                isCatheringOrder: false,
                methodOfPayment: methodOfPayment,//'cash',
                scheduledTime: scheduledTime,
                customerAddress,
                customerPhoneNumber
            }

            // console.log("FORM DATA:" + formData)
            // console.log(orderedItems)
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


    static fetchCatheringOrder = (menuItem, selectedOptions, orderType, methodOfPayment, specialInstructions, scheduledTime) =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.order

            let formData
            let orderedItems = []
            let placeId = menuItem.place._id
            let options = []

            selectedOptions.map(group => {
                group.options.map(option => {

                    options.push(option._id)
                })
            })
            orderedItems.push({
                food: menuItem._id,
                options: options
            })

            formData = {
                orderedMenuItems: orderedItems,
                place: placeId,
                specialInstructions: specialInstructions,
                orderType: orderType,
                isCatheringOrder: true,
                methodOfPayment: methodOfPayment,
                scheduledTime: scheduledTime
            }
            try {
                const { data } = await axios.post(url, formData)
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

    static fetchGetAllOrders = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.order
            try {
                const { data } = await axios.get(url)
                resolve(Order.createArrayOrder(data))

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });
    static fetchGetOrder = (id) =>
        new Promise(async (resolve, reject) => {
            const url = `${RestUrl.order}/${id}`
            try {
                const { data } = await axios.get(url)
                const order = new Order(data)
                resolve(order)

            } catch (error) {
                try {
                    const { message } = error.response.data.error
                    reject(message)
                } catch  {
                    reject(error.message)

                }
            }
        });

    static fetchGetAllCatheringOrders = () =>
        new Promise(async (resolve, reject) => {
            const url = RestUrl.getOrderCatherings()
            try {
                const { data } = await axios.get(url)
                resolve(Order.createArrayOrder(data))

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
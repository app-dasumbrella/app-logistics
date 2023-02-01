const getNumOrder = (items) => {
    let odNums = []
    items?.map(i => {
        if (odNums?.filter(it => it == i.order_number)?.length == 0) {
            odNums.push(i.order_number)
        }
    })

    return odNums?.length
}

const getOrders = (items) => {
    let odNums = []
    items?.map(i => {
        if (odNums?.filter(it => it.order_number == i.order_number)?.length == 0) {
            odNums.push({ order_number: i.order_number, payload: [i] })
        } else {
            let pindex = odNums.map(e => e.order_number).indexOf(i.order_number)
            odNums[pindex].payload.push(i)
        }
    })

    return odNums
}

const getFees = (items) => {
    let fee = 0
    items?.map(i => {

        fee += Number(i.fee)
    })

    return fee
}

const getCurrency = (items) => {
    let fee = ''
    items?.map(i => {

        fee = i.currency
    })

    return fee
}

const getMapurl = (items) => {
    let odNums = []
    items?.map(i => {
        let dest = ''
        let itOrder = i?.payload?.[0]
        if (itOrder.address?.address1)
            dest = dest + itOrder.address?.address1 + ', '
        if (itOrder.address?.city)
            dest = dest + itOrder.address?.city + ', '
        if (itOrder.address?.state)
            dest = dest + itOrder.address?.state + ', '
        if (itOrder.address?.country)
            dest = dest + itOrder.address?.country + ' '
        if (itOrder.address?.zipcode)
            dest = dest + itOrder.address?.zipcode
        odNums.push(dest)
    })
    let dest = ''
    let way = ''


    odNums.map((k, index) => {
        if (index == 0) {
            dest = k
        }
        else {
            if (way == '')
                way = k
            else
                way += '|' + k
        }
    })

    var url = `https://www.google.com/maps/dir/?api=1&origin=Your Location&destination=${dest}&travelmode=driving&waypoints=${way}`;

    return url
}


export {
    getNumOrder,
    getFees,
    getOrders,
    getMapurl,
    getCurrency
}
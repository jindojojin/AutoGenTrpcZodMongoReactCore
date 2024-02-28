export const $isExists = {$exists: true};
export const $isNotExists = {$exists: false};
export const $isNull = {$eq: null};
export const $isNotNull = {$ne: null};

export const $available = (field: string) => ({
    $and: [
        {[field]: $isExists},
        {[field]: $isNotNull}
    ]
})

export const $notAvailable = (field: string) => ({
    $or: [
        {[field]: $isNull},
        {[field]: $isNotExists}
    ]
})
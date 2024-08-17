const editLoader = async ({
    params,
    request,
}: {
    params: any
    request: any
    }) => {
    return {
        id: params.id,
        mode: 'edit',
    }
}

export default editLoader

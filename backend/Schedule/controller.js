const sampleGet = async(request, response) => {
    response.status(200).json({'test': 'aeri'})
}
 const samplePost = async(request ,response) =>{
    //console.log(request.params)
    const {test} = request.body
    console.log(test)
    response.status(200).json({'test': 'test-test'})
}
module.exports = {sampleGet, samplePost}
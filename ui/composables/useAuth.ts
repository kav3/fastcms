export const useAuth = async () => {
    const app = useNuxtApp()
    const store = useStore()

    const redirect = async (path) => {
        if (!!app.ssrContext) {
          app.ssrContext.res.writeHead(302, {
            Location: path,
          })
          return app.ssrContext.res.end()
        }
        return await useRouter().push(path)
      }
      
    // console.log(!!app.ssrContext)    

    if (!store.state.token)
        return redirect('/login')

}
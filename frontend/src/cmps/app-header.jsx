import { svgService } from '../services/svg.service.js'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { trackService } from '../services/track.service.js'
import { useNavigate } from 'react-router-dom'

export function AppHeader() {
  const navigate = useNavigate()
  // const user = useSelector((storeState) => storeState.userModule.user)
  // const [newSearch, setNewSearch] = useState(null)

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     console.log('debounce from search')
  //   }, 1000)
  //   return () => {
  //     clearTimeout(debounce)
  //   }
  // }, [newSearch])

  function goToPreviousPage() {
    navigate(-1)
  }

  function goToNextPage() {
    navigate(1)
  }

  // function handleChange({ target }) {
  //   const value = target.value || ''
  //   setNewSearch((prevSearch) => ({ prevSearch, value }))
  // }

  // async function onLogin(credentials) {
  //   try {
  //     const user = await login(credentials)
  //   } catch (err) {
  //     console.log('Cannot login')
  //   }
  // }

  // async function onSignup(credentials) {
  //   try {
  //     const user = await signup(credentials)
  //   } catch (err) { }
  // }
  // async function onLogout() {
  //   try {
  //     await logout()
  //   } catch (err) { }
  // }

  // return (
  //   // <h1>AppHeader</h1>
  /* {user && (
        <span className="user-info">
          <Link to={`user/${user._id}`}>
            {user.imgUrl && <img src={user.imgUrl} />}
            {user.fullname}
          </Link>
          <button onClick={onLogout}>Logout</button>
        </span>
      )} 
      {/* {!user && (
        <section className="user-info">
          <LoginSignup onLogin={onLogin} onSignup={onSignup} />
        </section>
      )} */
  // )



  return (
    <header className="app-header content-layout ">
      <div className="flex ">
        <nav className="flex ">
          <button onClick={goToPreviousPage} className="btn-go-back">{svgService.btnGoBackHeader}</button>
          <button onClick={goToNextPage} className="btn-go-next">{svgService.btnGoNextHeader}</button>
        </nav>
        <section className="btn-login-signup-wrapper">
          <button className="btn-signup">
            <span>Sign up</span>
          </button>
          <button className="btn-login">Log in</button>
        </section>
      </div>
    </header>
  )
}

import { useState } from 'react';
import { Connection } from '@holo-host/web-sdk'
import './ExploreContainer.css';
import { inspect } from 'util'
import { profile } from 'console';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const [webSdkConnection, setWebSdkConnection] = useState(null)
  const [profile, setProfile] = useState({
    nickname: "Not set",
    avatar_url: "Not set"
  })

  const [newNickname, setNewNickname] = useState("")

  const signIn = () => {
    console.log('creating connection')
    const connection = new Connection(
      'http://localhost:24273',
      signal => console.log('GOT SIGNAL', signal))

    console.log('signing in with connection', connection)

    connection.ready()
    .then(() => {
      console.log('connection ready')
      connection.signIn().then(() => {
        console.log('signed in')

        setWebSdkConnection(connection)
      })
    })
  }

  const updateProfile = () => {
    if (!webSdkConnection) {
      console.log('connection not ready')
      signIn()
      return
    }

    webSdkConnection.zomeCall(
      'elemental-chat',
      'profile',
      'update_my_profile',
      {
        nickname: newNickname,
        avatar_url: `https://${newNickname}.img`
      }
    ).then(result => {
      setNewNickname("")
      console.log(`\n\nRESULT OF update_my_profile \n${inspect(result)}\n\n`)
    })
  }

  const getProfile = () => {
    if (!webSdkConnection) {
      console.log('connection not ready')
      signIn()
      return
    }

    webSdkConnection.zomeCall(
      'elemental-chat',
      'profile',
      'get_my_profile',
      null
    ).then(result => {
      console.log(`\n\nRESULT OF get_my_profile \n${inspect(result)}\n\n`)
      setProfile(result)
    })
  }

  return (
    <div className="container">
      {!webSdkConnection && <button onClick={signIn}>Sign In</button>}
      {webSdkConnection && <>
        <div>Nickname: {profile.nickname}</div>
        <div>Avatar Url: {profile.avatar_url}</div>
        <div>
          <button onClick={getProfile}>Get Profile</button>
        </div>
        <div style={{ borderBottom: "1px solid lightgray" }} />
        <div>
          <label>New Nickname
            <input value={newNickname} onChange={e => setNewNickname(e.target.value)} />
          </label>
        <div>
          <button onClick={updateProfile}>Update Profile</button>
        </div>
      </div>
    </>}
    </div>
  );
};

export default ExploreContainer;

import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)
  
  async function getMemes(){
    setLoading(true)
    setMemes([])
    const key = 'RavRQ6ANTYzGqr0ZQp0GfwfhyZoLRC6N'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url+= 'api_key='+key
    url += '&q='+text
    const r = await fetch(url)
    const body = await r.json()
    setMemes(body.data)
    setText('')
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth variant="outlined"
            label="Search for memes!"  
            value={text}
            onChange={e=>setText(e.target.value)}
            onKeyPress={e=>{
              if(e.key==='Enter') getMemes()
            }}
          />

          <Button variant="contained" color="primary"
            onClick={getMemes}>
            Search
          </Button>
        </div>
        {loading && <LinearProgress color="secondary" />}
      </header>

      <div className="memes">
        {memes.map((meme,i)=> <Meme key={i} {...meme} />)}
      </div>

    </div>
  );
}

function Meme({title,images}){
  return <div className="meme">
    <img alt="meme" src={images.fixed_height.url}/>
    <div className="meme-title">{title}</div>
  </div>
}

export default App;

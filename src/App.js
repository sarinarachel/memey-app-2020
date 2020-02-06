import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  button: {
    margin: '0 4px',
    padding: '0 24px',
  },
}));

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)
  const classes = useStyles();
  
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
      <div className="progress-bar">
        {loading && <LinearProgress />}
      </div>
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

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SearchIcon />}
            onClick={getMemes}>
            Search
          </Button>
        </div>
      </header>

      <div className="memes">
        {memes.map((meme,i)=> <Meme key={i} {...meme} />)}
      </div>

    </div>
  );
}

function Meme({title,images}){
  return (
    <div className="meme">
      <img 
        alt="meme" 
        src={images.fixed_height.url}
        onClick={()=> window.open(images.fixed_height.url, "_blank")}
      />
    <div className="meme-title">{title}</div>
  </div>
)}

export default App;
import { useState, useRef } from 'react'


function App() {
  
const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";


  const validateUsername = (value) => {
  const isValid = /^[a-zA-Z0-9]{6,}$/.test(value); // Alfanumerico, min 6 caratteri
  return isValid ? '' : 'Username non valido (solo lettere/numeri, min 6 caratteri)';
};

const validatePassword = (value) => {
  const hasLetters = [...value].some((char) => letters.includes(char));
  const hasNumbers = [...value].some((char) => numbers.includes(char));
  const hasSymbols = [...value].some((char) => symbols.includes(char));
  const isLongEnough = value.length >= 8;

  const isValid = hasLetters && hasNumbers && hasSymbols && isLongEnough;

  return isValid ? '' : 'Password non valida (min 8 caratteri, almeno una lettera, un numero e un simbolo)';

};

const validateDescription= (value) => {
  const isLongEnough = value.length >= 100 && value.length <= 1000;

  return isLongEnough ? '' : 'La descrizione deve essere tra 100 e 1000 caratteri';
};


  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const specializationRef = useRef(null);
  const experienceYearsRef = useRef(null);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const surname = surnameRef.current.value.trim();
    const specialization = specializationRef.current.value.trim();
    const experienceYears = parseInt(experienceYearsRef.current.value);
    
    const newErrors = {};
    
    if (!name) newErrors.name = 'Il nome è obbligatorio';
    if(!surname) newErrors.surname = 'Il cognome è obbligatorio';
    if (!username.trim()) newErrors.username = 'Usuername non inserito';
    if (!password.trim()) newErrors.password = 'nessuna password inserita';
    if (!specialization) newErrors.specialization = 'Specializzazione non selezionata';
    if (experienceYears <= 0) newErrors.experienceYears = 'Anni di esperienza non validi';
    if (!description.trim()) newErrors.description = 'Descrizione non inserita';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
  const formData = {
    name,
    surname,
    username,
    password,
    specialization,
    experienceYears,
    description,
  };

  console.log('Form submitted:', formData);
  alert('Form submitted successfully!');

  // Reset del form 
    nameRef.current.value = '';
    surnameRef.current.value = '';
    specializationRef.current.value = 'Full Stack'; 
    experienceYearsRef.current.value = '';
    setUsername('');
    setPassword('');
    setDescription('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registrazione sviluppatore</h1>
      {/* campo nome */}
      <div>
        <label>Nome Completo:</label>
        <input type="text" 
         ref={nameRef}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      {/* campo cognome */}
      <div>
        <label>Cognome:</label>
        <input 
        type="text"
        ref={surnameRef}
        />
        {errors.surname && <span className="error">{errors.surname}</span>}
      </div>

      {/* campo username */}
      <div>
        <label>Username:</label>
        <input 
        type="text"
        value = {username}
        onChange={(e) => {
          const value = e.target.value;
          setUsername(value);
          setErrors((prev) => ({
            ...prev,
            username: validateUsername(value)
          }));
        }}
        />
        <span className={errors.username ? 'error' : 'valid'}>
          {errors.username || 'Username valido'}
        </span>      
      </div>

      {/* campo password */}
      <div>
        <label>Password:</label>
        <input 
        type="text"
        value = {password}
        onChange = {(e) => {
          const value = e.target.value;
          setPassword(value);
          setErrors((prev) => ({
            ...prev,
            password: validatePassword(value)
          }));
          }}
        />
        <span className={errors.password ? 'error' : 'valid'}>
          {errors.password || 'Password valida'}
        </span>
      </div>

      {/* campo specializzazione */}
      <div>
        <label>Specializzazione:</label>
        <select name="select" ref={specializationRef}>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
        {errors.specialization && <span className="error">{errors.specialization}</span>}
      </div>

      {/* campo anni di esperienza */}
      <div>
        <label>Anni di esperienza:</label>
        <input 
        type="number"
        ref={experienceYearsRef}
        />
        {errors.experienceYears && <span className="error">{errors.experienceYears}</span>}
      </div>

      {/* campo descrizione */} 
      <div>
        <label>Descrizione:</label>
        <textarea 
        value = {description}
        onChange = {(e) => {
          const value = e.target.value;
          setDescription (value);
          setErrors((prev) => ({
            ...prev,
            description: validateDescription(value)
          }));
        }}
        />
        <span className={errors.description ? 'error' : 'valid'}>
          {errors.description || 'Descrizione valida'}
        </span>

      </div>
      <button type="submit">Registrati</button>

    </form>

    
  )

}

export default App

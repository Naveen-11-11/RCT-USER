import React, { useState } from 'react';

const Home = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    age: '',
    email: '',
    contact: '',
  });
  const [user, setUser] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput((ps) => {
      return { ...ps, [name]: value }
    });
  };

  const addUser = (e) => {
    e.preventDefault();
    const { name, age, email, contact } = formInput;

    // Validation check
    if (!name || !age || !email || !contact) {
      setError('*All fields are required');
      return;
    }

    setError('');

    if (editingIndex !== null) {
      // Edit existing user
      setUser((ps) => {
        const updatedUsers = [...ps]; // Clone the existing users array
        updatedUsers[editingIndex] = formInput;// Update the user at the editingIndex with the new data
        return updatedUsers;  // returned 
      });
      //  const updatedTodos = user.map((todo, index) =>
      //   index === editingIndex ? formInput: todo
      // );
      // setUser(updatedTodos);
      setEditingIndex(null);
    }
    else {
      // Add new user
      setUser((ps) => [...ps, formInput]);
    }
    setFormInput({ name: '', age: '', email: '', contact: '' });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormInput(user[index]);
    setError(''); // Clear error message on edit
  };
  const handleCancel = () => {
    setEditingIndex(null);
    setFormInput({ name: '', age: '', email: '', contact: '' });
  };

  const handleDelete = (index) => {
    setUser((ps) => ps.filter((user, i) => i !== index));
  };

  return (
    <div className='homecss'>
      <form>
        <label>Name</label><br />
        <input name="name" type="text" value={formInput.name} onChange={handleChange} /><br /><br />
        <label>Age</label><br />
        <input name="age" type="text" value={formInput.age} onChange={handleChange} /><br /><br />
        <label>Email</label><br />
        <input name="email" type="text" value={formInput.email} onChange={handleChange} /><br /><br />
        <label>Contact</label><br />
        <input name="contact" type="text" value={formInput.contact} onChange={handleChange} /><br /><br />
        <button onClick={addUser}>{editingIndex !== null ? 'Update' : 'Add'}</button>
        {editingIndex !== null && (
          <button type="button" onClick={handleCancel}>Cancel</button>
        )}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {user.length > 0 ? (
          user.map((user, index) => (
            <div key={index}>
              <h1>{user.name}</h1>
              <h2>{user.age}</h2>
              <h2>{user.email}</h2>
              <h2>{user.contact}</h2>
              <button onClick={() => handleEdit(index)}>Edit</button>&nbsp;
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};

export default Home;




// local storage method
/*

import React, { useState, useEffect } from 'react';

const Home = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    age: '',
    email: '',
    contact: '',
  });
  const [user, setUser] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load users from localStorage when component mounts
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUser(JSON.parse(savedUsers));
    }
  }, []);

  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput((ps) => ({
      ...ps, [name]: value
    }));
  };

  const addUser = (e) => {
    e.preventDefault();
    const { name, age, email, contact } = formInput;

    // Validation check
    if (!name || !age || !email || !contact) {
      setError('*All fields are required');
      return;
    }

    setError('');

    if (editingIndex !== null) {
      // Edit existing user
      setUser((ps) => {
        const updatedUsers = [...ps];
        updatedUsers[editingIndex] = formInput;
        saveUsersToLocalStorage(updatedUsers); // Save to localStorage
        return updatedUsers;
      });
      setEditingIndex(null);
    } else {
      // Add new user
      setUser((ps) => {
        const updatedUsers = [...ps, formInput];
        saveUsersToLocalStorage(updatedUsers); // Save to localStorage
        return updatedUsers;
      });
    }
    setFormInput({ name: '', age: '', email: '', contact: '' });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormInput(user[index]);
    setError(''); // Clear error message on edit
  };

  const handleDelete = (index) => {
    setUser((ps) => {
      const updatedUsers = ps.filter((user, i) => i !== index);
      saveUsersToLocalStorage(updatedUsers); // Save to localStorage
      return updatedUsers;
    });
  };

  return (
    <div className='homecss'>
      <form>
        <label>Name</label><br />
        <input name="name" type="text" value={formInput.name} onChange={handleChange} /><br /><br />
        <label>Age</label><br />
        <input name="age" type="text" value={formInput.age} onChange={handleChange} /><br /><br />
        <label>Email</label><br />
        <input name="email" type="text" value={formInput.email} onChange={handleChange} /><br /><br />
        <label>Contact</label><br />
        <input name="contact" type="text" value={formInput.contact} onChange={handleChange} /><br /><br />
        <button onClick={addUser}>{editingIndex !== null ? 'Update' : 'Add'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {user.length > 0 ? (
          user.map((user, index) => (
            <div key={index}>
              <h1>{user.name}</h1>
              <h2>{user.age}</h2>
              <h2>{user.email}</h2>
              <h2>{user.contact}</h2>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};

export default Home;


*/

// another with separate array for name age email contact 
/*

import React, { useState } from 'react';

const Home = () => {
  // Separate state for each field
  const [names, setNames] = useState<string[]>([]);
  const [ages, setAges] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [contacts, setContacts] = useState<string[]>([]);
  
  // State for the current input
  const [formInput, setFormInput] = useState({
    name: '',
    age: '',
    email: '',
    contact: '',
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, age, email, contact } = formInput;

    // Validation check
    if (!name || !age || !email || !contact) {
      setError('*All fields are required');
      return;
    }

    setError('');

    if (editingIndex !== null) {
      // Edit existing user
      setNames((prev) => {
        const updatedNames = [...prev];
        updatedNames[editingIndex] = name;
        return updatedNames;
      });

      setAges((prev) => {
        const updatedAges = [...prev];
        updatedAges[editingIndex] = age;
        return updatedAges;
      });

      setEmails((prev) => {
        const updatedEmails = [...prev];
        updatedEmails[editingIndex] = email;
        return updatedEmails;
      });

      setContacts((prev) => {
        const updatedContacts = [...prev];
        updatedContacts[editingIndex] = contact;
        return updatedContacts;
      });

      setEditingIndex(null);
    } else {
      // Add new user
      setNames((prev) => [...prev, name]);
      setAges((prev) => [...prev, age]);
      setEmails((prev) => [...prev, email]);
      setContacts((prev) => [...prev, contact]);
    }

    // Clear input fields
    setFormInput({ name: '', age: '', email: '', contact: '' });
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormInput({
      name: names[index],
      age: ages[index],
      email: emails[index],
      contact: contacts[index],
    });
    setError(''); // Clear error message on edit
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormInput({ name: '', age: '', email: '', contact: '' });
  };

  const handleDelete = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
    setAges((prev) => prev.filter((_, i) => i !== index));
    setEmails((prev) => prev.filter((_, i) => i !== index));
    setContacts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='homecss'>
      <form onSubmit={addUser}>
        <label>Name</label><br />
        <input name="name" type="text" value={formInput.name} onChange={handleChange} /><br /><br />
        <label>Age</label><br />
        <input name="age" type="text" value={formInput.age} onChange={handleChange} /><br /><br />
        <label>Email</label><br />
        <input name="email" type="text" value={formInput.email} onChange={handleChange} /><br /><br />
        <label>Contact</label><br />
        <input name="contact" type="text" value={formInput.contact} onChange={handleChange} /><br /><br />
        <button type="submit">{editingIndex != null ? 'Update' : 'Add'}</button>
        {editingIndex != null && (
          <button type="button" onClick={handleCancel}>Cancel</button>
        )}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {names.length > 0 ? (
          names.map((name, index) => (
            <div key={index}>
              <h1>{name}</h1>
              <h2>{ages[index]}</h2>
              <h2>{emails[index]}</h2>
              <h2>{contacts[index]}</h2>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};

export default Home;


*/
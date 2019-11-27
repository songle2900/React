import React, { useRef, useCallback, useState } from 'react';

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  // Manage Input
  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: [value]
      });
    }, [form]
  );

  // function for form register
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username
      };

      // register new data to array
      setData({
        ...data,
        array: data.array.concat(info)
      });

      // resetting form
      setForm({
        name: '',
        username: ''
      });
      nextId.current += 1;
    },
    [data, form.name, form.username]
  );

  // delete function
  const onRemove = useCallback(
    id => {
      setData({
        ...data,
        array: data.array.filter(info => info.id !== id)
      });
    }, [data]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="ID"
          value={form.username}
          onChange={onChange}
        />
        <input 
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
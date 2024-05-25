

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];

const ProjectFilter = ({currentFilter , changeFilter}) => {
  

  const handleClick = (newFilter) => {
   changeFilter(newFilter)
  };

  console.log(currentFilter);

  return (
    <div className="project-filter my-8">
      <nav className="flex items-center p-4 bg-white rounded shadow">
        <p className="text-sm mr-4">Filter by:</p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={`mr-2 last:mr-0 px-2 py-1 font-bold text-sm cursor-pointer border-r border-gray-200 last:border-0 ${
              currentFilter === f ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}


export default ProjectFilter
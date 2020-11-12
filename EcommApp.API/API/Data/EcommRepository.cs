using API.Data;

namespace API.Data
{
    public class EcommRepository : IEcommRepository
    {
        private readonly DataContext _context;

        public EcommRepository(DataContext context)
        {
            this._context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
    }
}
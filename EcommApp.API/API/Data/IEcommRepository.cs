using System.Threading.Tasks;

namespace API.Data
{
    public interface IEcommRepository
    {
         void Add<T>(T entity) where T: class;
    }
}
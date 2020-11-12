using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IAuthRepository
    {
     Task<User> Register(User user, string password);

     Task<bool> IsUserExists(string username);
     Task<User> Login(string username, string password);
    }
}
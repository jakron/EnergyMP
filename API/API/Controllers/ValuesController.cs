using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    [Authorize]
    public class ValuesController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        // GET api/values UserViewModel
        public IQueryable<UserViewModel> Get()
        {
            var item = db.Users.Select(x=> new UserViewModel {
            Id = x.Id,
            Email = x.Email,
            UserName = x.UserName
            }).OrderBy(x=>x.Email);
            return item;
        }

        // GET api/values/5
        public IQueryable<UserViewModel> Get(string id)
        {
            var item = db.Users.Find(id);
            if (item == null)
                 NotFound();
            db.Users.Remove(item);
            db.SaveChanges();

            var itemList = db.Users.Select(x => new UserViewModel
            {
                Id = x.Id,
                Email = x.Email,
                UserName = x.UserName
            }).OrderBy(x => x.Email);
            return itemList;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            var item = db.Users.Find(id);
            if (item == null)
                 NotFound();
            db.Users.Remove(item);
            db.SaveChanges();
             Ok(item);
        }
    }
}

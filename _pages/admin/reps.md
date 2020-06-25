---
permalink: /admin/reps/
layout: admin
---

<table>
 <tr>
    <th>Edit</th>
    <th>id</th>
    <th>district</th>
    <th>email</th>
    <th>facebook</th>
    <th>first_name</th>
    <th>malegislature_url</th>
    <th>last_name</th>
    <th>hometown</th>
    <th>party</th>
    <th>phone</th>
    <th>picture</th>
    <th>twitter</th>
    <th>website</th>
 </tr>
  {% for rep in site.legislators %}
  {% capture rep_id %}{{ rep.aom_id }}{% endcapture %}
  {% assign committee = site.committees | where: "id", committee_id | first %}
   <tr>
    <td>
      <a href="https://next--actonmass.netlify.com/admin/#/collections/legislators/entries/{{rep_id}}">
        Edit <i class="fas fa-edit"></i>
      </a>
    </td>
    <td>{{ rep_id }}</td>
    <td>{{ rep.district }}</td>
    <td>{{ rep.email }}</td>
    <td>{{ rep.facebook }}</td>
    <td>{{ rep.first_name }}</td>
    <td>{{ rep.malegislature_url }}</td>
    <td>{{ rep.last_name }}</td>
    <td>{{ rep.hometown }}</td>
    <td>{{ rep.party }}</td>
    <td>{{ rep.phone }}</td>
    <td>{{ rep.picture }}</td>
    <td>{{ rep.twitter }}</td>
    <td>{{ rep.website }}</td>
  </tr>
  {% endfor %}
</table>

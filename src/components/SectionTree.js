import React, {useState, useEffect} from 'react'
import { Card } from 'antd'
import { server } from '../config';
import axios from 'axios';

function SectionTree (props) {
  const {id, onSelectSection} = props;
  const [document, setDocument] = useState(null);
  const [sections, setSections] = useState(null);
  useEffect(() => {
    if (!id) return;
    axios.post(`${server}/corpus/get_sections_by_doc_id/`, {doc_id: id}).then(res => {
      res = res.data;
      console.log(res)
      const sections = res.list;
      const document = res.document;
      setDocument(document);
      setSections(sections);
    })
  }, [id]);

  if (!sections) return <></>;
  return (
    <div
      className="sectionTreeContainer"
    >
      <Card title={document} extra={<span style={{fontSize: '12px', color: 'rgb(180, 180, 180)'}}>选择章节</span>} style={{ width: "60%" }}>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-left'}}>
          {sections.map(section => (
            <div key={section} onClick={e => onSelectSection(id, e.target.textContent)} className="sectionTreeItem">{section}</div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default SectionTree;
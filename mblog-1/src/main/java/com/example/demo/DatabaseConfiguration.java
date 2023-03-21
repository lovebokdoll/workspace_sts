package com.example.demo;

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
//사용자 정의 클래스도 ApplicstionContext나  BeanFactory의 관리를 받을 수 있다. - 의존성 주입
//application.properties - maven
//applicstion.yml - gradle
@Configuration
@PropertySource("classpath:/application.properties")
//@PropertySource("classpath:/application.yml")
//@MapperScan(basePackages = "com.example.demo.mapper")
//static - css,js,images 다 static에 넣는다
public class DatabaseConfiguration {
	private static final Logger logger = LogManager.getLogger(DatabaseConfiguration.class);
//@Configuration으로 선언된 클래스에서만 사용가능한 어노테이션임 =>@Bean
	@Bean
	@ConfigurationProperties(prefix = "spring.datasource.hikari") //application.properties의 접두어
	public HikariConfig hikariConfig() {//인스턴스화 
		return new HikariConfig();//생성자 호출 - 메모리로딩-변수와 메소드를 누릴 수 있음
	
	}

	@Bean
	public DataSource dataSource() {
		DataSource dataSource = new HikariDataSource(hikariConfig());
		logger.info("datasource : {}", dataSource);
		return dataSource;
	}

	@Autowired
	private ApplicationContext applicationContext; //빈관리 - 이른인스턴스화 -BeanFactory의 자손클래스임 -  그래서 기능은 더 많다
	//POJO에서는 MyBatisConfig.xml<-hiksriConfig()
	
	/* 	<bean id="sqlSessionFactory"
		class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="configLocation"
			value="WEB-INF/mybatis-config.xml" />
		<property name="dataSource" ref="data-source-target" />
	</bean>
	 */
	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(dataSource);
//classpath는 src/main/resourcs이고 해당 쿼리가 있는 xml 위치는 본인의 취향대로 위치키시고 그에 맞도록 설정해주면 된다.
		sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:/mapper/**/*.xml"));
		return sqlSessionFactoryBean.getObject();
	}

	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
		return new SqlSessionTemplate(sqlSessionFactory);
	}
}